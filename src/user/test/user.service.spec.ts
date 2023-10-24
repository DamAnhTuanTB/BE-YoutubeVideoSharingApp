import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/index.dto';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

describe('User Service', () => {
  let userService: UserService;
  let model: Model<User>;

  const mockUserService = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('User Service', () => {
    it('should be detail a user when get detail user', async () => {
      const result = await userService.getDetailUser({
        email: 'client@gmail.com',
        password: '123456',
        _id: '123456',
      } as CreateUserDto);

      expect(result).toEqual({
        data: {
          id: '123456',
          email: 'client@gmail.com',
        },
      });
    });

    it('should be return a detail user when find user by email', async () => {
      const mockUser = {
        email: 'client@gmail.com',
        _id: '123',
        password: '123456',
      };

      jest.spyOn(model, 'findOne').mockImplementation(
        () =>
          ({
            lean: jest.fn().mockResolvedValue(mockUser),
          }) as any,
      );

      const result = await userService.findUserByEmail('client@gmail.com');
      expect(model.findOne).toHaveBeenCalledWith({ email: 'client@gmail.com' });
      expect(result).toEqual(mockUser);
    });
  });
});
