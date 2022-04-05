import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniversityModule } from './university/university.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import config from './configuration';

@Module({
  imports: [
    UniversityModule,
    StudentModule,
    MongooseModule.forRoot(
      'mongodb://' +
        config.database.host +
        ':' +
        config.database.port +
        '/UniversityEnrollment',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
