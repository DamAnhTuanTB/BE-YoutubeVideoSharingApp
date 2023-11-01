import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../utils/user.decorator';
import { CommentService } from './comment.service';
import { CommentVideoDto } from './dto/index.dto';

@ApiTags('Comment')
@Controller({
  path: 'comment',
  version: '1',
})
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  commentVideo(@Body() body: CommentVideoDto, @User('email') email: string) {
    return this.commentService.commentVideo(body, email);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getListComment(@Param('id') id: string) {
    return this.commentService.getListComment(id);
  }
}
