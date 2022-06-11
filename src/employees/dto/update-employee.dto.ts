import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  name?: string;
  job_title?: string;
  salary?: number;

  @IsNotEmpty()
  phone_no?: string;
}
