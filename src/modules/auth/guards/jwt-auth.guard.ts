import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_LOGIN_KEY, IS_PUBLIC_KEY } from 'src/common/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isLogin = this.reflector.getAllAndOverride<boolean>(IS_LOGIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    if (isLogin) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (super.canActivate(context) as Promise<boolean>).catch(() => {});
      return true;
    } else {
      return super.canActivate(context);
    }
  }
}
