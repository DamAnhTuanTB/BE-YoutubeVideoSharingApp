import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from '../comment/comment.module';
import { VideoSchema } from './model/video.model';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Video',
        schema: VideoSchema,
      },
    ]),
    ConfigModule,
    CommentModule,
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
