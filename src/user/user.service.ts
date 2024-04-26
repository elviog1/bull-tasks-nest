import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async createUser(createUser:CreateUserDTO): Promise<User>{
        try {
            const user = new this.userModel(createUser)
            return user.save()
        } catch (error) {
            console.log(error)
        }
    }

    async findAll(): Promise<User[]>{
        try {
            const user =this.userModel.find().exec()
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id:string){
        try {
            const userFound = this.userModel.findById(id)
            return userFound
        } catch (error) {
            console.log(error)
        }
    }
    async findOneByEmail(email:string){
        try {
            const findUser = this.userModel.findOne({email})
            return findUser
        } catch (error) {
            console.log(error)
        }
    }
}
