import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { User } from '../entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'entities/Address';
import { Order } from 'entities/Order';
import { ProductProperty} from 'entities/ProductProperty'
import { Category } from 'entities/Category'
@Module({
  imports: [  TypeOrmModule.forFeature([User, Address]) ],
  components: [UserService, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/product/wish', method: RequestMethod.ALL },
      { path: '/user/addAddress', method: RequestMethod.ALL },
      { path: '/productProperty/create', method: RequestMethod.ALL },
      { path: '/productProperty/add', method: RequestMethod.ALL },
      { path: '/productProperty/searchByProperty', method: RequestMethod.ALL },
      { path: '/cart/add', method: RequestMethod.ALL });
  }
}