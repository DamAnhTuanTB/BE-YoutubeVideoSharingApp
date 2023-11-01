import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommentVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  videoId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  comment: string;
}

export class QueryGetListCommentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  page: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  limit: number;
}
