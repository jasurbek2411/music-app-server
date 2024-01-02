import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TrackModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@database.uerjola.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
})
export class AppModule {}
