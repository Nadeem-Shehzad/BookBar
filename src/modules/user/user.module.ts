import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../auth/entities/auth.entity";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "src/common/common.module";
import { RoleCheckGuard } from "src/common/guards/role-check.guard";
import { OwnerShipGuard } from "src/common/guards/ownership.guard";


@Module({
   imports: [
      TypeOrmModule.forFeature([User]),
      JwtModule.register({}),
      forwardRef(() => CommonModule)
   ],
   controllers: [UserController],
   providers: [UserService, JwtAuthGuard, RoleCheckGuard, OwnerShipGuard],
   exports: [UserService, TypeOrmModule]
})

export class UserModule {}