import { IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  dept_name: string;
}
