import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from 'src/schema/track.schem';
import { Comment, CommentSchema } from 'src/schema/comment.schema';
import { TrackController } from './track.controller';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
})
export class TrackModule {}
