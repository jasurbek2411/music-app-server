import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from './track.schem';

export type CommentSchema = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' } })
  track: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
