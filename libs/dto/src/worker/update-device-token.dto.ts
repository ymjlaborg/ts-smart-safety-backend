import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * 업데이트 디바이스 토큰
 */
export class UpdateDeviceToken {
  @IsNotEmpty({
    message: '디바이스 토큰을 입력하셔야 합니다.',
  })
  @ApiProperty({
    description: 'FCM을 통해 취득한 디바이스 토큰',
    required: true,
  })
  token: string;
}
