import { IsEmail, IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Department, Designation } from '../enums/employee.enums';

export class CreateEmployeeDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Designation)
  @IsNotEmpty()
  designation: Designation;

  @IsEnum(Department)
  @IsNotEmpty()
  department: Department;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  salary: number;
}
