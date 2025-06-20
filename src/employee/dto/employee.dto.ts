import { Department, Designation } from '../enums/employee.enums';

export class EmployeeDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  designation: Designation;
  department: Department;
  salary: number;
}
