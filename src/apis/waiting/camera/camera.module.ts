import { Module } from '@nestjs/common';
import { CameraController } from './camera.controller';
import { CameraService } from './camera.service';
import { RepositoriesModule } from '@app/repositories';

@Module({
  imports: [RepositoriesModule],
  controllers: [CameraController],
  providers: [CameraService],
})
export class CameraModule {}
