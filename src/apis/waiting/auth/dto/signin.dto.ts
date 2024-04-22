import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SigninDto {
  @IsNotEmpty({
    message: '사용자 아이디는 필수 입력사항입니다.',
  })
  @MinLength(4, {
    message: '사용자 아이디는 최소 4글자입니다.',
  })
  @ApiProperty({
    description: '아이디',
    required: true,
  })
  userId: string;

  @IsNotEmpty({
    message: '사용자 비밀번호는 필수 입력사항입니다.',
  })
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, {
    message:
      '비밀번호는 영문과 숫자, 특수기호 조합하여 6자리 이상 입력하셔야 합니다. ',
  })
  @ApiProperty({
    description: '비밀번호',
    required: true,
  })
  userPw: string;
}
