import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { formatedResponse } from '../utils';
import { ErrorCommentVideo, SuccessCommentVideo } from '../utils/message';
import { CommentVideoDto } from './dto/index.dto';
import { CommentDocument } from './model/comment.model';

export class CommentService {
  constructor(
    @InjectModel('Comment')
    private readonly CommentModel: Model<CommentDocument>,
  ) {}

  async commentVideo(body: CommentVideoDto, email: string) {
    try {
      await this.CommentModel.create({ ...body, email, createdAt: new Date() });
      return {
        message: SuccessCommentVideo,
      };
    } catch (err) {
      throw new HttpException(
        ErrorCommentVideo,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getListComment(videoId: string) {
    const results = await this.CommentModel.find({
      videoId,
    })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return {
      data: results.map((item: any) => {
        return formatedResponse(item);
      }),
    };
  }
}
