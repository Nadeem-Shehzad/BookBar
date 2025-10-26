import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const AuthorData = createParamDecorator((data: unknown, context: ExecutionContext) => {
   const request = context.switchToHttp().getRequest();
   const authorData = request.user;

   return authorData;
});