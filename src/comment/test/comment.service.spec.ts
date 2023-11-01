import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { formatedResponse } from '../../utils';
import { SuccessCommentVideo } from '../../utils/message';
import { CommentService } from '../comment.service';
import { CommentVideoDto } from '../dto/index.dto';
import { Comment } from '../model/comment.model';

describe('Comment Service', () => {
  let commentService: CommentService;
  let model: Model<Comment>;

  const mockComment = {
    _id: '61c0ccf11d7bf83d153d7c06',
    email: 'client@gmail.com',
    comment: 'Very good',
    videoId: '123456',
    createdAt: '20-10-2023',
  };

  const mockCommentService = {
    find: jest.fn(),
    create: jest.fn(),
    countDocuments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        CommentService,
        {
          provide: getModelToken(Comment.name),
          useValue: mockCommentService,
        },
      ],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
    model = module.get<Model<Comment>>(getModelToken(Comment.name));
  });

  describe('Comment Service', () => {
    it('should be return message successfully comment a video ', async () => {
      const newComment = {
        comment: 'Very good',
        videoId: '123',
      };

      jest.spyOn(model, 'create').mockImplementationOnce(
        () =>
          Promise.resolve({
            ...newComment,
            email: 'client@gmail.com',
            createdAt: '2023-10-31',
          }) as any,
      );

      const result = await commentService.commentVideo(
        newComment as CommentVideoDto,
        'client@gmail.com',
      );

      expect(result).toEqual({ message: SuccessCommentVideo });
    });

    it('should be return a list comments', async () => {
      jest.spyOn(model, 'countDocuments').mockResolvedValue(1);
      // jest.spyOn(model, 'find').mockImplementation(
      //   () =>
      //     ({
      //       sort: () => ({
      //         skip: () => ({
      //           limit: () => ({
      //             lean: () => ({
      //               exec: jest.fn().mockResolvedValue([mockComment]),
      //             }),
      //           }),
      //         }),
      //       }),
      //     }) as any,
      // );

      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            sort: () => ({
              lean: () => ({
                exec: jest.fn().mockResolvedValue([mockComment]),
              }),
            }),
          }) as any,
      );

      const result = await commentService.getListComment('123456');

      expect(model.find).toHaveBeenCalledWith({
        videoId: '123456',
      });

      expect(result).toEqual({
        data: [formatedResponse(mockComment)],
      });
    });
  });
});
