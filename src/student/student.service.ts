import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UniversityService } from 'src/university/university.service';
import { Student } from './interfaces/student.interface';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student')
    private readonly studentModel: Model<Student>,
    private readonly universityService: UniversityService,
  ) {}

  async findStudent(studentId: string): Promise<Student> {
    return await this.studentModel.findById(studentId);
  }

  async createStudent(student: Student): Promise<Student> {
    const newStudent = new this.studentModel(student);
    return await newStudent.save();
  }

  async calcGpa(student: Student): Promise<number> {
    const sum = student.grades.reduce(
      (sum, gradeJSON) => sum + gradeJSON.grade,
      0,
    );
    return sum / student.grades.length;
  }

  async getStudents(universityId: string): Promise<Array<Student>> {
    return await this.studentModel.find({ universityId });
  }

  async enroll(studentId: string, universityId: string): Promise<void> {
    const [universityToEnroll, studentToBeEnrolled] = await Promise.all([
      this.universityService.findUniversity(universityId),
      this.findStudent(studentId),
    ]);

    const studentGpa = await this.calcGpa(studentToBeEnrolled);

    if (studentGpa < universityToEnroll.minGpa) {
      throw new BadRequestException(
        "Student's GPA does not meet the required GPA for that university",
      );
    }

    const students = await this.studentModel.count({
      universityId: universityId,
    });
    if (students >= universityToEnroll.maxNumberOfStudents) {
      throw new BadRequestException('University is full!');
    }
    await this.studentModel.findByIdAndUpdate(studentId, {
      universityId: universityId,
    });
    return;
  }
}
