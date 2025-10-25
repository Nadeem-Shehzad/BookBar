import { Injectable } from "@nestjs/common";


@Injectable()
export class UserService {
   async allUsers(){
      return 'There is no user till now.';
   }
}