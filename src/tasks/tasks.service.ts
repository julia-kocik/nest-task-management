import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found.`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  // deleteAllTasks(): Task[] {
  //   this.tasks = [];
  //   return this.tasks;
  // }
  async deleteOneTask(id: string): Promise<string> {
    const one = await this.taskRepository.delete(id);
    if (!one) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return 'Task successfully deleted';
  }

  async updateOneTask(id: string, status: TaskStatus): Promise<Task> {
    const one = await this.getTaskById(id);
    one.status = status;
    await this.taskRepository.save(one);
    return one;
  }
}
