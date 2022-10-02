import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'Julia',
  id: 'someID',
  password: 'password',
  tasks: [],
};

describe('TaskService', () => {
  let taskService ;
  let taskRepository;

  beforeEach(async () => {
    // initialize a NestJS module with TasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    taskService = module.get(TasksService);
    taskRepository = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('calls TaskRepository.getTasks and returns the result', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');
      const result = await taskService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });
});
