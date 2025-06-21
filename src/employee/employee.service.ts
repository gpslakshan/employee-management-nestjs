import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const existing = await this.employeeRepo.findOneBy({ email: dto.email });
    if (existing) {
      throw new BadRequestException(
        `An employee with email ${dto.email} already exists`,
      );
    }

    const employee = EmployeeMapper.toEntity(dto);
    const createdEmployee = await this.employeeRepo.save(employee);
    return EmployeeMapper.toDto(createdEmployee);
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
    const employee = await this.employeeRepo.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    if (dto.email) {
      const existing = await this.employeeRepo.findOneBy({ email: dto.email });
      if (existing && existing.id !== id) {
        throw new BadRequestException(
          `Another employee with email ${dto.email} already exists`,
        );
      }
    }

    const updatedEmployee = EmployeeMapper.toEntity(dto);
    const merged = this.employeeRepo.merge(employee, updatedEmployee);

    await this.employeeRepo.save(merged);
    return EmployeeMapper.toDto(merged);
  }

  async remove(id: number): Promise<void> {
    const employee = await this.employeeRepo.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    await this.employeeRepo.delete(id);
  }
}
