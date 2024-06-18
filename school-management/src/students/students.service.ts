import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import * as fs from 'fs';
import * as path from 'path';

const DATA_FILE = path.join(__dirname, '../../../students.json');

@Injectable()
export class StudentsService {
  private students: Student[] = this.loadData();

  private loadData(): Student[] {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  }

  private saveData() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.students, null, 2));
  }

  create(createStudentDto: CreateStudentDto): Student {
    const student: Student = {
      id: this.students.length ? Math.max(...this.students.map(s => s.id)) + 1 : 1,
      ...createStudentDto,
      paid: false,
    };
    this.students.push(student);
    this.saveData();
    return student;
  }

  findAll(): Student[] {
    return this.students;
  }

  findOne(id: number): Student {
    const student = this.students.find(student => student.id === id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  update(id: number, updateStudentDto: UpdateStudentDto): Student {
    const student = this.findOne(id);
    Object.assign(student, updateStudentDto);
    this.saveData();
    return student;
  }

  remove(id: number): void {
    const index = this.students.findIndex(student => student.id === id);
    if (index === -1) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    this.students.splice(index, 1);
    this.saveData();
  }

  payFee(id: number): Student {
    const student = this.findOne(id);
    student.paid = true;
    this.saveData();
    return student;
  }
}
