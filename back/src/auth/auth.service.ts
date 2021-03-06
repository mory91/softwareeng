import * as jwt from 'jsonwebtoken';
import { Component, Query, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../entities/User'
@Component()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async createToken(user) {
    const expiresIn = 60 * 60, secretOrKey = 'secret';
    const toCode = { user };
    const token = jwt.sign(toCode, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<User> {
    if (signedUser['user']) {      
      let user = await this.userService.findByPhone(signedUser['user']['phone']);
      if (user) {        
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}