import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwtDecode(token);
    const userId = decoded['userId'];
    if (userId == undefined) {
      throw new BadRequestException('Error decoding bearer token');
    }
    return userId;
  },
);
