import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUserType {
  sub: string
  username: string
}

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const authUser: AuthUserType = ctx.getContext().req.user;
    return authUser;
  },
);