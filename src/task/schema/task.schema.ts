import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mongoose, SchemaType, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({default:"Pending"})
  status: string;

  @Prop()
  date: Date;
  
  @Prop({type: Types.ObjectId, ref: 'User'})
  userId:string
}

export const taskSchema = SchemaFactory.createForClass(Task);
