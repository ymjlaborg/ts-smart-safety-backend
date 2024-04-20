import { ApiProperty } from '@nestjs/swagger';

export class UpdateCoursesDto {
  @ApiProperty({
    description: '업데이트 할 ID',
    required: true,
    isArray: true,
  })
  courseID: number[];
}
