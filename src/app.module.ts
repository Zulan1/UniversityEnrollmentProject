import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniversityModule } from './university/university.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    UniversityModule,
    StudentModule,
    MongooseModule.forRoot('mongodb://localhost/UniversityEnrollment'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
