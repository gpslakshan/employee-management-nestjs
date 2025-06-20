import { Employee } from './entities/employee.entity';
import { EmployeeDto } from './dto/employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

export class EmployeeMapper {
  static toDto(employee: Employee): EmployeeDto {
    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      designation: employee.designation,
      department: employee.department,
      salary: Number(employee.salary), // ✅ Convert salary to number
    };
  }

  static toDtoList(employees: Employee[]): EmployeeDto[] {
    return employees.map(this.toDto);
  }

  // Updated toEntity method to support both CreateEmployeeDto and UpdateEmployeeDto
  static toEntity(dto: CreateEmployeeDto | UpdateEmployeeDto): Employee {
    const employee = new Employee();

    // Map values only if they exist in the DTO (for UpdateEmployeeDto, some fields might be undefined)
    if (dto.firstName) employee.firstName = dto.firstName;
    if (dto.lastName) employee.lastName = dto.lastName;
    if (dto.email) employee.email = dto.email;
    if (dto.designation) employee.designation = dto.designation;
    if (dto.department) employee.department = dto.department;
    if (dto.salary) employee.salary = dto.salary;

    return employee;
  }
}
