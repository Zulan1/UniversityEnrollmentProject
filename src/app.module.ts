import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniversityModule } from './university/university.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import configuration from '../config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UniversityModule,
    StudentModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb://localhost/UniversityEnrollment'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
