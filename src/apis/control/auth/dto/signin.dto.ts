import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SigninDto {
  @IsNotEmpty({
    message: '아이디또는 비밀번호는 필수 입력 항목입니다.',
  })
  @ApiProperty({
    description: '사용자 아이디',
    required: true,
  })
  userId: string;

  @IsNotEmpty({
    message: '아이디또는 비밀번호는 필수 입력 항목입니다.',
  })
  @ApiProperty({
    description: '사용자 아이디',
    required: true,
  })
  userPw: string;
}
