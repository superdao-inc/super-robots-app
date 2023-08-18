import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/user/user.model';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { Links } from '../links/links.model';

@Module({
	imports: [TypeOrmModule.forFeature([User, Links])],
	providers: [AuthResolver, AuthService]
})
export class AuthModule {}
