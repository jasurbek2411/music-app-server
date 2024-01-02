import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from 'src/schema/track.schem';
import { Comment, CommentSchema } from 'src/schema/comment.schema';
import { TrackController } from './track.controller';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';

@Module({
  providers: [
    TrackService,
    // FileService
  ],
  controllers: [TrackController],

  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    FileModule,
  ],
})
export class TrackModule {}
