import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeMapper } from './employee.mapper';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeeDto): Promise<EmployeeDto> {
    const employee = EmployeeMapper.toEntity(dto);
    await this.employeeRepo.save(employee);
    return EmployeeMapper.toDto(employee);
  }

  async findAll(): Promise<EmployeeDto[]> {
    const employees = await this.employeeRepo.find();
    return EmployeeMapper.toDtoList(employees);
  }

  async findOne(id: number): Promise<EmployeeDto> {
    const employee = await this.employeeRepo.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return EmployeeMapper.toDto(employee);
  }

  async update(id: number, dto: UpdateEmployeeDto): Promise<EmployeeDto> {
    // Fetch the existing employee by id
    const employee = await this.employeeRepo.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Convert DTO to entity and update only the changed fields
    const updatedEmployee = EmployeeMapper.toEntity(dto);

    // Merge the existing entity with the updated fields
    // TypeORM’s merge() method only overwrites fields that are explicitly defined in the second argument. Fields that are undefined are ignored during the merge.
    this.employeeRepo.merge(employee, updatedEmployee);

    // Save the updated employee back to the database
    await this.employeeRepo.save(employee);

    // Return the updated employee as DTO
    return EmployeeMapper.toDto(employee);
  }

  async remove(id: number): Promise<void> {
    const employee = await this.employeeRepo.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    await this.employeeRepo.delete(id);
  }
}
