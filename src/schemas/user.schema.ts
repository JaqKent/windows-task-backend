import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  token: string;

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  generateToken(): string {
    this.token = bcrypt.hashSync(`${this.email}-${Date.now()}`, 10);
    return this.token;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
