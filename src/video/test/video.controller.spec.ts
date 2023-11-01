import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { CommentService } from '../../comment/comment.service';
import { formatedResponse } from '../../utils';
import { SuccessShareVideo } from '../../utils/message';
import { ShareVideoDto } from '../dto/index.dto';
import { VideoController } from '../video.controller';
import { VideoService } from '../video.service';

const mockVideo = {
  _id: '61c0ccf11d7bf83d153d7c06',
  email: 'client@gmail.com',
  title: 'A song of Son Tung',
  description: 'Very good',
  createdAt: '20-10-2023',
};

const mockComment = {
  _id: '61c0ccf11d7bf83d153d7c06',
  email: 'client@gmail.com',
  comment: 'Very good',
  videoId: '123456',
  createdAt: '20-10-2023',
};

const mockVideoService = {
  getListVideo: jest.fn().mockResolvedValueOnce({
    data: [formatedResponse(mockVideo)],
    page: 1,
    limit: 10,
    total: 1,
  }),
  shareVideo: jest.fn(),
};

const mockCommentService = {
  getListComment: jest.fn().mockResolvedValueOnce({
    data: [formatedResponse(mockComment)],
  }),
  commentVideo: jest.fn(),
};

describe('Video Controller', () => {
  let videoService: VideoService;
  let videoController: VideoController;
  let commentService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule,
      ],
      controllers: [VideoController],
      providers: [
        {
          provide: VideoService,
          useValue: mockVideoService,
        },
        {
          provide: CommentService,
          useValue: mockCommentService,
        },
      ],
    }).compile();

    videoService = module.get<VideoService>(VideoService);
    videoController = module.get<VideoController>(VideoController);
    commentService = module.get<CommentService>(CommentService)
  });

  it('should be defined video controller', () => {
    expect(videoController).toBeDefined();
  });

  it('should successfully get list books', async () => {
    const result = await videoController.getListVideo();

    expect(videoService.getListVideo).toHaveBeenCalled();
    expect(result).toEqual({
      data: [formatedResponse(mockVideo)],
      page: 1,
      limit: 10,
      total: 1,
    });
  });

  it('should successfully share a video', async () => {
    const newVideo = {
      url: 'https://www.youtube.com/embed/aBjmdLmE2zI?si=ZDgEAf5RG7tl3QOG',
      title: 'A song of Son Tung',
      description: 'Very good',
    };

    mockVideoService.shareVideo = jest
      .fn()
      .mockResolvedValueOnce({ message: SuccessShareVideo });

    const result = await videoController.shareVideo(
      newVideo as ShareVideoDto,
      'client@gmail.com',
    );

    expect(videoService.shareVideo).toHaveBeenCalled();
    expect(result).toEqual({ message: SuccessShareVideo });
  });
});
