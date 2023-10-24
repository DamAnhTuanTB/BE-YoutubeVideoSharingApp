import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
