import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksModule } from '../links/links.module';
import { Links } from '../links/links.model';
import { EmailModule } from 'src/services/email/email.module';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.model';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([User, Links]), LinksModule, EmailModule],
	providers: [UserService, UserResolver],
	exports: [TypeOrmModule, UserService]
})
export class UserModule {}
