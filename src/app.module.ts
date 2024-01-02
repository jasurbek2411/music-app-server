import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TrackModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@database.uerjola.mongodb.net/?retryWrites=true&w=majority`,
    ),
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static',),
    }),
  ],
})
export class AppModule {}
