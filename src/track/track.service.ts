import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comment } from 'src/schema/comment.schema';
import { Track } from 'src/schema/track.schem';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const image = this.fileService.createFile(FileType.IMAGE, picture);
    const voice = this.fileService.createFile(FileType.AUDIO, audio);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: voice,
      picture: image,
    });
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
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

  async listen(id: ObjectId): Promise<void> {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: {
        $regex: new RegExp(query, 'i'),
      },
    });
    return tracks;
  }
}
