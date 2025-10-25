import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";


@Injectable()
export class OwnerShipGuard implements CanActivate {
   canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const loginUserId = request.user?.id;
      const updateUserId = request.params.userId;

      if (!loginUserId || !updateUserId) {
         throw new ForbiddenException('Access Denied: missing user ids.');
      }

      if (String(loginUserId) !== String(updateUserId)) {
         throw new ForbiddenException(`Access Denied: You are not allowed to modify Other's data`);
      }

      return true;
   }
}