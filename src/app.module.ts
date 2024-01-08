import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data.source';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

const DbModule = TypeOrmModule.forRoot(dataSourceOptions);

@Module({
  imports: [ConfigModule.forRoot(), DbModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
