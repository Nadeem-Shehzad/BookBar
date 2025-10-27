import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/auth.entity";
import { CommonModule } from "src/common/common.module";
import { EmailValidator } from "src/common/validators/email-validator";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";


@Module({
   imports: [
      JwtModule.registerAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '12h' }
         })
      }),
      TypeOrmModule.forFeature([User]),
      CommonModule,
      UserModule
   ],
   controllers: [AuthController],
   providers: [AuthService, EmailValidator, JwtAuthGuard]
})

export class AuthModule { }