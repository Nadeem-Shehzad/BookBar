import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { map, Observable } from "rxjs";


@Injectable()
export class ResponseInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

      const response = context.switchToHttp().getResponse();

      return next.handle().pipe(
         map((data) => this.handleSuccess(data, response.statusCode))
      );
   }

   private handleSuccess(data: any, statusCode: number) {
      return {
         success: true,
         statusCode,
         data
      }
   }
}