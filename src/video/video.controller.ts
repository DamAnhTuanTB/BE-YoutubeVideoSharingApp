import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../utils/user.decorator';
import {
  GetInfoVideoDto,
  QueryGetListVideoDto,
  ShareVideoDto,
} from './dto/index.dto';
import { VideoService } from './video.service';

@ApiTags('Video')
@Controller({
  path: 'video',
  version: '1',
})
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/info')
  @HttpCode(HttpStatus.OK)
  getInfoVideo(@Query() query: GetInfoVideoDto) {
    return this.videoService.getInfoVideo(query);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  getListVideo(@Query() query?: QueryGetListVideoDto) {
    return this.videoService.getListVideo(query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  shareVideo(@Body() body: ShareVideoDto, @User('email') email: string) {
    return this.videoService.shareVideo(body, email);
  }
}
