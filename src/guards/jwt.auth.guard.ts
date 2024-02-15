import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as K from '../shared/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(K.JWT_STRATEGY.DEFAULT) {
  canActivate(context: ExecutionContext) {
    const http = context.switchToHttp();
    const res = http.getResponse();
    const req = http.getRequest();
    req.res = res;
    return super.canActivate(context);
  }
}
