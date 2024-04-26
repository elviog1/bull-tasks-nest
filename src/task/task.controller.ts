import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';
import { Request } from 'express';
import { Task } from './schema/task.schema';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService:TaskService){}

    @Post('')
    async createTask(@Body() taskData:CreateTaskDTO,userId:string):Promise<Task>{
        try {
            const newTask =await this.taskService.createTask(taskData,userId)
            return newTask
        } catch (error) {
            console.log(error)
        }
    }

    @Get()
    async getAllTasks():Promise<Task[]>{
        try {
            const tasks = await this.taskService.getAllTask()
            return tasks
        } catch (error) {
            console.log(error)
        }
    }

    @Get('/:userId')
    async getAllTasksByUserId(@Param('userId') userId:string):Promise<Task[]>{
        try {
            const tasks = await this.taskService.getAllTasksByUserId(userId)
            return tasks
        } catch (error) {
            console.log(error)
        }
    }

    @Get('/id/:taskId')
    async getTaskById(@Param('taskId') taskId:string):Promise<Task>{
        try {
            const task = await this.taskService.getTaskById(taskId)
            if(!task){
                throw new BadRequestException("Task not found")
            }
            return task
        } catch (error) {
            console.log(error)
        }
    }

    @Delete('/:taskId')
    async deleteTask(@Param('taskId') taskId: string){
        try {
            return await this.taskService.deleteTask(taskId)
        } catch (error) {
            console.log(error)
        }
    }

    @Put('/:taskId')
    async updateTask(@Body() taskUpdate:UpdateTaskDTO, @Param('taskId') taskId:string):Promise<Task>{
        try {
            const task = await this.taskService.updateTask(taskId,taskUpdate)
            return task
        } catch (error) {
            console.log(error)
        }
    }
}
