import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { RepositoriesModule } from '@app/repositories';

@Module({
  imports: [RepositoriesModule],
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}
