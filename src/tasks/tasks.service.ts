import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    //define temp arr
    let tasks = this.getAllTasks();
    //status
    if (status) {
      tasks = tasks.filter((item) => item.status === status);
    }
    //search
    if (search) {
      tasks = tasks.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search),
      );
    }
    //return final result
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((item) => item.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteAllTasks(): Task[] {
    this.tasks = [];
    return this.tasks;
  }

  deleteOneTask(id: string): void {
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }

  updateOneTask(id: string, status: TaskStatus): Task {
    const one = this.tasks.find((item) => item.id === id);
    one.status = status;
    return one;
  }
}
