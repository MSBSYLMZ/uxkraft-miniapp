import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SpecItemModule } from './modules/spec-item/spec-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SpecItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
