import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { CreateUserDto } from '../dto/index.dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

const mockUserService = {
  getDetailUser: jest.fn().mockResolvedValueOnce({
    data: {
      id: '123',
      email: 'client@gmail.com',
    },
  }),
};

describe('User Controller', () => {
  let userService: UserService;
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule,
      ],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  it('should be defined video controller', () => {
    expect(userController).toBeDefined();
  });

  it('should successfully get detail user', async () => {
    const result = await userController.getProfile({
      _id: '123',
      email: 'client@gmail.com',
      password: '123456',
    } as CreateUserDto);

    expect(userService.getDetailUser).toHaveBeenCalled();
    expect(result).toEqual({
      data: {
        id: '123',
        email: 'client@gmail.com',
      },
    });
  });
});
