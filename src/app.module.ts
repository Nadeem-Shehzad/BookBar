import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';


@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         load: [configuration]
      }),
      TypeOrmModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: (configService: ConfigService) => ({
            type: configService.get<'postgres'>('DB_TYPE'),
            host: configService.get<string>('DB_HOST'),
            port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            autoLoadEntities: true,
            synchronize: true,
         })
      }),
      AuthModule,
      UserModule
   ],
})

export class AppModule { }