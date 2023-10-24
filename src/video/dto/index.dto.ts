import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryGetListVideoDto {
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

export class ShareVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  description: string;
}

export class GetInfoVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  url: string;
}
