import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
export default class TasksController {
    private taskService;
    private logger;
    constructor(taskService: TasksService);
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    getTaskById(id: string, user: User): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    deleteOneTask(id: string, user: User): Promise<string>;
    updateOneTask(id: string, updateTaskStatusDto: UpdateTaskStatusDto, user: User): Promise<Task>;
}
