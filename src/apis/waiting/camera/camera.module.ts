import { Module } from '@nestjs/common';
import { CameraController } from './camera.controller';

@Module({
  imports: [],
  controllers: [CameraController],
  providers: [],
})
export class CameraModule {}
