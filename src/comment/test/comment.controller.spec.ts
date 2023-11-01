import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { formatedResponse } from '../../utils';
import { SuccessCommentVideo } from '../../utils/message';
import { CommentController } from '../comment.controller';
import { CommentService } from '../comment.service';
import { CommentVideoDto } from '../dto/index.dto';

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

describe('Comment Controller', () => {
  let commentService: CommentService;
  let commentController: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule,
      ],
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService,
        },
      ],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
    commentController = module.get<CommentController>(CommentController);
  });

  it('should be defined comment controller', () => {
    expect(commentController).toBeDefined();
  });

  it('should successfully get list comments', async () => {
    const result = await commentController.getListComment('123456');

    expect(result).toEqual({
      data: [formatedResponse(mockComment)],
    });
  });

  it('should successfully comment a video', async () => {
    const newComment = {
      comment: 'Very good',
      videoId: '123456',
    };

    mockCommentService.commentVideo = jest
      .fn()
      .mockResolvedValueOnce({ message: SuccessCommentVideo });

    const result = await commentController.commentVideo(
      newComment as CommentVideoDto,
      'client@gmail.com',
    );

    expect(commentService.commentVideo).toHaveBeenCalled();
    expect(result).toEqual({ message: SuccessCommentVideo });
  });
});
