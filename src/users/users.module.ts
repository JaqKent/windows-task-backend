import { Module } from '@nestjs/common';
import { UsersService } from 'src/user-service/user-service.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
