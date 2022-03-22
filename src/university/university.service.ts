import { Injectable } from '@nestjs/common';
import { University } from './interfaces/university.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UniversityService {
  constructor(
    @InjectModel('University')
    private readonly universityModel: Model<University>,
  ) {}

  async findUniversity(universityId: string): Promise<University> {
    return await this.universityModel.findById(universityId);
  }

  async createUniversity(university: University): Promise<University> {
    const newUniversity = new this.universityModel(university);
    return await newUniversity.save();
  }
}
