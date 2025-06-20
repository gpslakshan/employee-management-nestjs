import { Employee } from './entities/employee.entity';
import { EmployeeDto } from './dto/employee.dto';

export class EmployeeMapper {
  static toDto(employee: Employee): EmployeeDto {
    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      designation: employee.designation,
      department: employee.department,
      salary: employee.salary,
    };
  }

  static toDtoList(employees: Employee[]): EmployeeDto[] {
    return employees.map(this.toDto);
  }
}
