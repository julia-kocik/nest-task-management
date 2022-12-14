import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found.`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteOneTask(id: string, user: User): Promise<string> {
    const one = await this.taskRepository.delete({ id, user });
    if (one.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return 'Task successfully deleted';
  }

  async updateOneTask(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const one = await this.getTaskById(id, user);
    one.status = status;
    await this.taskRepository.save(one);
    return one;
  }
}
