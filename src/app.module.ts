import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProfileModule } from './profile/profile.module.js';

@Module({
  imports: [ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
