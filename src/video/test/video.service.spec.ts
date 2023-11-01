import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CommentService } from '../../comment/comment.service';
import { Comment } from '../../comment/model/comment.model';
import { formatedResponse } from '../../utils';
import { SuccessShareVideo } from '../../utils/message';
import { ShareVideoDto } from '../dto/index.dto';
import { Video } from '../model/video.model';
import { VideoService } from '../video.service';

describe('Video Service', () => {
  let videoService: VideoService;
  let commentService: CommentService;
  let model: Model<Video>;

  const mockVideo = {
    _id: '61c0ccf11d7bf83d153d7c06',
    email: 'client@gmail.com',
    title: 'A song of Son Tung',
    description: 'Very good',
    createdAt: '20-10-2023',
  };

  const mockVideoService = {
    find: jest.fn(),
    create: jest.fn(),
    countDocuments: jest.fn(),
  };

  const mockComment = {
    _id: '61c0ccf11d7bf83d153d7c06',
    email: 'client@gmail.com',
    comment: 'Very good',
    videoId: '123456',
    createdAt: '20-10-2023',
  };

  const mockCommentService = {
    getListComment: jest.fn().mockResolvedValueOnce({
      data: [formatedResponse(mockComment)],
    }),
    commentVideo: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        VideoService,
        {
          provide: getModelToken(Video.name),
          useValue: mockVideoService,
        },
        CommentService,
        {
          provide: getModelToken(Comment.name),
          useValue: mockCommentService,
        },
      ],
    }).compile();

    videoService = module.get<VideoService>(VideoService);
    commentService = module.get<CommentService>(CommentService);
    model = module.get<Model<Video>>(getModelToken(Video.name));
  });

  describe('Video Service', () => {
    it('should be return a list videos', async () => {
      jest.spyOn(model, 'countDocuments').mockResolvedValue(1);
      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            sort: () => ({
              skip: () => ({
                limit: () => ({
                  lean: () => ({
                    exec: jest.fn().mockResolvedValue([mockVideo]),
                  }),
                }),
              }),
            }),
          }) as any,
      );

      const result = await videoService.getListVideo();

      expect(model.find).toHaveBeenCalledWith({});

      expect(result).toEqual({
        data: [formatedResponse(mockVideo)],
        page: 1,
        limit: 10,
        total: 1,
      });
    });

    it('should be return message successfully share a video ', async () => {
      const newVideo = {
        url: 'https://www.youtube.com/embed/aBjmdLmE2zI?si=ZDgEAf5RG7tl3QOG',
        title: 'A song of Son Tung',
        description: 'Very good',
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(newVideo) as any);

      const result = await videoService.shareVideo(
        newVideo as ShareVideoDto,
        'client@gmail.com',
      );

      expect(result).toEqual({ message: SuccessShareVideo });
    });
  });
});
