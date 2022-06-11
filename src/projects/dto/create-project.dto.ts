import { IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  project_name: string;
}
