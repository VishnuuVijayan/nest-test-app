import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';

export class UpdateEmployeeDepartmentDto extends PartialType(
  CreateDepartmentDto,
) {
  dept_id?: string;
}
