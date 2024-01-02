import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comment } from 'src/schema/comment.schema';
import { Track } from 'src/schema/track.schem';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(dto: CreateTrackDto): Promise<Track> {
    const track = await this.trackModel.create({ ...dto, listens: 0 });
    return track;
  }

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackModel.find();
    return tracks;
  }

  async getOne(trackId: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(trackId).populate('comments');
    return track;
  }

  async deleteTrack(trackId: ObjectId): Promise<ObjectId> {
    await this.trackModel.findByIdAndDelete(trackId);
    return trackId;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id as any);
    await track.save();
    return comment;
  }
}
