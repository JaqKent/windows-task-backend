import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AppModule {}
