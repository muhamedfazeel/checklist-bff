import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetGoogleCredentialToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers['x-user-auth-token'];
    return token;
  },
);
