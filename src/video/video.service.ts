import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import {
  checkYoutubeURL,
  formatedResponse,
  getParamsPagination,
  getYoutubeVideoId,
} from '../utils';
import {
  ErrorVideo,
  IncorrectLinkOfVideo,
  SuccessShareVideo,
} from '../utils/message';
import {
  GetInfoVideoDto,
  QueryGetListVideoDto,
  ShareVideoDto,
} from './dto/index.dto';
import { VideoDocument } from './model/video.model';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel('Video')
    private readonly VideoModel: Model<VideoDocument>,
    private readonly configService: ConfigService,
  ) {}

  async getListVideo(query?: QueryGetListVideoDto) {
    const limit = Number(query?.limit) || 10;
    const page = Number(query?.page) || 1;
    const { skip } = getParamsPagination({ page, limit });

    const total = await this.VideoModel.countDocuments({});

    const results = await this.VideoModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    return {
      page,
      limit,
      total,
      data: results.map((item: any) => {
        return formatedResponse(item);
      }),
    };
  }

  async shareVideo(body: ShareVideoDto, email: string) {
    try {
      await this.VideoModel.create({ ...body, email, createdAt: new Date() });
      return {
        message: SuccessShareVideo,
      };
    } catch (error) {
      throw new HttpException(ErrorVideo, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getInfoVideo(query: GetInfoVideoDto) {
    const url = query.url;
    if (!checkYoutubeURL(url)) {
      throw new BadRequestException(IncorrectLinkOfVideo);
    }

    const id = getYoutubeVideoId(url);

    const videoInfo: AxiosResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${this.configService.get(
        'API_KEY_YOUTUBE',
      )}&part=snippet&id=${id}`,
    );

    if (videoInfo.data?.items?.length > 0) {
      return {
        title: videoInfo.data?.items[0]?.snippet?.title,
        urlEmbed: `https://www.youtube.com/embed/${id}`,
      };
    } else {
      throw new BadRequestException(IncorrectLinkOfVideo);
    }
  }
}
