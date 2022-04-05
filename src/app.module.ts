import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniversityModule } from './university/university.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { configModule } from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UniversityModule,
    StudentModule,
    configModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: 'mongodb://' + config.get<string>('database.host') + ':' + config.get<string>('database.port')
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  dbHost: string;
  constructor(
    private readonly config: ConfigService,
    
    ) {this.dbHost = config.get<string>('database.host');};
}
