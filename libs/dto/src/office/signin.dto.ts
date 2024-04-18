import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SigninDto {
  @IsNotEmpty({
    message: '',
  })
  @ApiProperty({
    description: '검사소 아이디',
    required: true,
  })
  officeID: number;

  @IsNotEmpty({
    message: '',
  })
  @MinLength(4, {
    message: '',
  })
  @ApiProperty({
    description: '작업자 아이디',
    required: true,
  })
  workerID: string;

  @IsNotEmpty({
    message: '',
  })
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, {
    message:
      '비밀번호는 영문과 숫자, 특수기호 조합하여 6자리 이상 입력하셔야 합니다. ',
  })
  @ApiProperty({
    description: '작업자 비밀번호',
    required: true,
  })
  workerPw: string;
}
