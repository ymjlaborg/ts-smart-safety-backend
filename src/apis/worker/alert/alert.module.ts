import { Module } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { RepositoriesModule } from '@app/repositories';

@Module({
  imports: [RepositoriesModule],
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}
