import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AlertDto {
  @IsNotEmpty({
    message: '알림 메시지 아이디는 필수항목입니다.',
  })
  @IsNumber({}, { message: '알림 메시지는 숫자입니다.' })
  @ApiProperty({
    description: '알림 메시지 아이디',
  })
  alertId: number;
}
