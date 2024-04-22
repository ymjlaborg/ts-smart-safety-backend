import { Module } from '@nestjs/common';
import { HookController } from './hook.controller';
import { HookService } from './hook.service';
import { RepositoriesModule } from '@app/repositories';
import { XApiKeyStrategy } from '@app/strategy';

@Module({
  imports: [RepositoriesModule],
  controllers: [HookController],
  providers: [HookService, XApiKeyStrategy],
})
export class HookModule {}
