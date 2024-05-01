import { ListDto } from '@app/dto';
import { AlertLevel, AlertType } from '@app/enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListAlertDto extends ListDto {
  @IsOptional()
  @ApiPropertyOptional({
    title: '알림 단계',
    description: '보여줄 알림 단계',
    type: [AlertLevel],
  })
  levels: AlertLevel[] | AlertLevel;

  @IsOptional()
  @ApiPropertyOptional({
    title: '진로',
    description: '보여줄 진로',
    type: [Number],
  })
  courses: number[] | number;

  @IsOptional()
  @ApiPropertyOptional({
    title: '내용',
    description: '알림 내용',
    type: [AlertType],
  })
  types: AlertType[] | AlertType;

  @IsOptional()
  @ApiPropertyOptional({
    title: '시작일',
    description: '검색 시작일',
    type: [Date],
  })
  startDate?: Date = new Date();

  @IsOptional()
  @ApiPropertyOptional({
    title: '종료일',
    description: '검색 시작일',
    type: [Date],
  })
  endDate?: Date = new Date();
}
