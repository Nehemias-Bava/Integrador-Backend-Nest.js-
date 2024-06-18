import { IsString, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsNumber()
  monthlyFee: number;
}