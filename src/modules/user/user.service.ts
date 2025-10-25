import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../auth/entities/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateProfileDTO } from "../auth/dto/update.dto";


@Injectable()
export class UserService {

   constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

   async allUsers(): Promise<User[]> {
      return await this.userRepo.find({});
   }

   async findByEmail(email: string): Promise<User | null> {
      const user = await this.userRepo.findOne({ where: { email } });
      return user;
   }

   async findById(id: number): Promise<User | null> {
      const user = await this.userRepo.findOne({ where: { id } });
      return user;
   }

   async updateProfile(id: number, dataToUpdate: UpdateProfileDTO): Promise<User> {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
         throw new NotFoundException('User to Update not Found!');
      }

      Object.assign(user, dataToUpdate);
      const updatedUSer = await this.userRepo.save(user);
      return updatedUSer;
   }

   async deleteUser(id: number): Promise<string> {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
         throw new NotFoundException('User to Delete not Found!');
      }

      await this.userRepo.delete({ id });
      return 'User Deleted!';
   }

}