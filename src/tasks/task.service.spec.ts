import { InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Julia',
  id: 'someID',
  password: 'password',
  tasks: [],
};

describe('TaskService', () => {
  let taskService;
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

  describe('getTasksByID', () => {
    it('calls TaskRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId',
        status: TaskStatus.OPEN,
      };
      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await taskService.getTaskById('someID', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TaskRepository.findOne and handles an error', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(taskService.getTaskById('someId', mockUser)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
