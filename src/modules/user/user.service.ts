import { Injectable } from "@nestjs/common";
import { User } from "../auth/entities/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class UserService {

   constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

   async allUsers() {
      return 'There is no user till now.';
   }

   async findByEmail(email: string): Promise<User | null> {
      const user = await this.userRepo.findOne({ where: { email } });
      return user;
   }
}