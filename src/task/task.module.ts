import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, taskSchema } from './schema/task.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Task.name,schema:taskSchema}])],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
