import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniversityController } from './university/university.controller';
import { StudentController } from './student/student.controller';
import { EnrollController } from './enroll/enroll.controller';

@Module({
  imports: [],
  controllers: [AppController, UniversityController, StudentController, EnrollController],
  providers: [AppService],
})
export class AppModule {}
