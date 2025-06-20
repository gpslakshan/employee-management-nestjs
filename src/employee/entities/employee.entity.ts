import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Department, Designation } from '../enums/employee.enums';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: Designation })
  designation: Designation;

  @Column({ type: 'enum', enum: Department })
  department: Department;

  @Column('decimal')
  salary: number;
}
