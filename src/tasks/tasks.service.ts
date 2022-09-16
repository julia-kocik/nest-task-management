import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   //define temp arr
  //   let tasks = this.getAllTasks();
  //   //status
  //   if (status) {
  //     tasks = tasks.filter((item) => item.status === status);
  //   }
  //   //search
  //   if (search) {
  //     tasks = tasks.filter(
  //       (item) =>
  //         item.title.toLowerCase().includes(search) ||
  //         item.description.toLowerCase().includes(search),
  //     );
  //   }
  //   //return final result
  //   return tasks;
  // }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found.`);
    }
    return found;
  }
 
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteAllTasks(): Task[] {
  //   this.tasks = [];
  //   return this.tasks;
  // }
  // deleteOneTask(id: string): void {
  //   const one = this.getTaskById(id);
  //   if (one) {
  //     this.tasks = this.tasks.filter((item) => item.id !== id);
  //   }
  // }
  // updateOneTask(id: string, status: TaskStatus): Task {
  //   const one = this.getTaskById(id);
  //   one.status = status;
  //   return one;
  // }
}
