import { ListDto } from '@app/dto';
import { AlertLevel } from '@app/enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

enum Sort {
  Level = 'level',
  ReadAt = 'readAt',
  SendAt = 'sendAt',
}

enum Order {
  Desc = 'desc',
  Asc = 'asc',
}

export class ListAlertDto extends ListDto {
  @IsOptional()
  @ApiPropertyOptional({
    title: '알림 단계',
    description: '보여줄 알림 단계',
    example: AlertLevel.Caution,
    type: [String],
  })
  levels: AlertLevel[] | AlertLevel;

  @IsOptional()
  @ApiPropertyOptional({
    title: '정렬 대상',
    description: '정렬 대상을 보여준다.',
    example: Sort.SendAt,
    type: String,
  })
  sort?: Sort = Sort.SendAt;

  @IsOptional()
  @ApiPropertyOptional({
    title: '정렬 순서',
    description: '내림차순, 오름차순',
    example: Order.Desc,
    type: String,
  })
  order: Order;
}
