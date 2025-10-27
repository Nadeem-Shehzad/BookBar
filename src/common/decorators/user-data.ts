import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const UserData = createParamDecorator((data: unknown, context: ExecutionContext) => {
   const request = context.switchToHttp().getRequest();
   const user = request.user;

   if (!user) return null;

   return {
      id: user.id,
      name: user.name,
      email: user.email
   };
});