import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const GetUserID = createParamDecorator(
   (data: unknown, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      const userId = request.user?.id;

      return userId;
   },
);