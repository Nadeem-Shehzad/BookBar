import { Injectable } from "@nestjs/common";
import {
   ValidatorConstraintInterface,
   ValidatorConstraint,
   ValidationArguments
} from "class-validator";

import { UserService } from "src/modules/user/user.service";


@ValidatorConstraint({ async: true })
@Injectable()
export class EmailValidator implements ValidatorConstraintInterface {

   constructor(private readonly userService: UserService) { }

   async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
      if (!email) return true;
      const user = await this.userService.findByEmail(email);
      return !user;
   }

   defaultMessage(validationArguments?: ValidationArguments): string {
      return 'Email ($value) is already Exists!';
   }
}