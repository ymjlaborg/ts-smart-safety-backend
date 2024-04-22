import { ListDto } from '@app/dto';
import { AlertLevel } from '@app/enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumberString, IsOptional } from 'class-validator';

export class ListAlertDto extends ListDto {
  @IsOptional()
  @ApiPropertyOptional({
    title: '알림 단계',
    description: '보여줄 알림 단계',
    example: AlertLevel.Caution,
    type: [AlertLevel],
  })
  levels: AlertLevel[] | AlertLevel;

  @IsNumberString()
  @ApiPropertyOptional({
    title: '진로',
    description: '보여줄 진로',
    example: 3,
    type: [Number],
  })
  courses: number[] | number;

  @IsDateString()
  @ApiPropertyOptional({
    title: '시작일',
    description: '검색 시작일',
    example: new Date().toISOString(),
    type: [Date],
  })
  startDate?: Date = new Date();

  @IsDateString()
  @ApiPropertyOptional({
    title: '종료일',
    description: '검색 시작일',
    example: new Date().toISOString(),
    type: [Date],
  })
  endDate?: Date = new Date();
}
