import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data.source';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './reservation/reservation.module';
import { ConvertModule } from './convert/convert.module';
import { AuthModule } from './auth/auth.module';

const DbModule = TypeOrmModule.forRoot(dataSourceOptions);

@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule,
    UserModule,
    ReservationModule,
    ConvertModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
