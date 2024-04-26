import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}

    async createTask(taskData:CreateTaskDTO,userId:string):Promise<Task>{
        try {
            const newTask = new this.taskModel(taskData,userId)
            const savedTask = await newTask.save()
            const populatedTask = await savedTask.populate('userId')
            return populatedTask
        } catch (error) {
            console.log(error)
        }
    }

    async getAllTask(): Promise<Task[]>{
        try {
            const tasks = await this.taskModel.find().populate('userId')
            return tasks
        } catch (error) {
            console.log(error)
        }
    }

    async getAllTasksByUserId(userId:string):Promise<Task[]>{
        try {
            const tasks = await this.taskModel.find({userId})
            return tasks
        } catch (error) {
            console.log(error)
        }
    }

    async deleteTask(idTask:string){
        try {
            const task = await this.taskModel.findByIdAndDelete(idTask)
            return task
        } catch (error) {
            console.log(error)
        }
    }

    async updateTask(taskId:string, taskData:UpdateTaskDTO):Promise<Task>{
        try {
            const task = await this.taskModel.findByIdAndUpdate(taskId,taskData,{new:true})
            return task
        } catch (error) {
            console.log(error)
        }
    }
}
