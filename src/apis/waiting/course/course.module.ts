import { RepositoriesModule } from '@app/repositories';
import { Module } from '@nestjs/common';
import { TokenModule } from 'src/apis/Token/token.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [RepositoriesModule, TokenModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
