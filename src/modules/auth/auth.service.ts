import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/auth.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserDTO } from "./dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDTO } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
   constructor(
      @InjectRepository(User) private readonly authRepo: Repository<User>,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
   ) { }

   async userRegistration(userData: UserDTO): Promise<User> {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = {
         ...userData,
         password: hashedPassword
      }

      const user = this.authRepo.create(newUser);
      return await this.authRepo.save(user);
   }

   async userLogin(userData: LoginDTO): Promise<string> {
      const email = userData.email;
      const user = await this.authRepo.findOne({ where: { email } });

      if (!user) {
         throw new NotFoundException('User not Found!');
      }

      const passwordMatched = await bcrypt.compare(userData.password, user.password);

      if (!passwordMatched) {
         throw new ForbiddenException('Invalid Password!');
      }

      return this.generateToken(user, user.id);
   }

   private generateToken(user: UserDTO, id: any) {
      const payload = {
         id: id,
         email: user.email,
         role: user.role
      }

      const secret = this.configService.get<string>('JWT_SECRET');
      const token = this.jwtService.sign(payload, { secret });
      return token;
   }
}