import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateEmployeeDepartmentDto } from 'src/departments/dto/update-employee-department.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    const data = {
      name: createEmployeeDto.name,
      job_title: createEmployeeDto.job_title,
      phone_no: createEmployeeDto.phone_no,
      salary: createEmployeeDto.salary,
    };
    return this.prisma.employee.create({
      data: {
        ...data,
        department: { connect: { id: createEmployeeDto.dept_id } },
        project: { connect: { id: createEmployeeDto.project_id } },
      },
    });
  }

  findAll() {
    return this.prisma.employee.findMany({
      include: { department: true, project: true },
    });
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.employee.findUnique({
        where: { id },
        include: {
          department: { select: { dept_name: true } },
          project: { select: { project_name: true } },
        },
      });

      if (result) {
        result['department_name'] = result.department.dept_name;
        result['project_name'] = result.project.project_name;
        delete result.department;
        delete result.project;
        return {
          status: 'OK',
          result,
        };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Record not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  update(id: number, data: UpdateEmployeeDto) {
    return this.prisma.employee.update({ where: { id }, data });
  }

  async updateDept(id: number, data: UpdateEmployeeDepartmentDto) {
    const { dept_id } = data;
    try {
      const department = await this.prisma.department.findUnique({
        where: { id: +dept_id },
      });

      if (department) {
        const result = await this.prisma.employee.update({
          where: { id },
          data: {
            department: {
              connect: {
                id: +dept_id,
              },
            },
          },
        });
        return {
          status: 'OK',
          employee_id: result.id,
          new_dept_id: +dept_id,
        };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Department Not Found',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'No Employee Found',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw error;
      }
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prisma.employee.update({
        where: { id },
        data: { is_active: false },
      });
      if (result) {
        return {
          status: 'Success',
          message: 'Record deleted',
          employee_name: result.name,
        };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Record not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
