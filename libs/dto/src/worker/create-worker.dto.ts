import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  Matches,
  MinLength,
} from 'class-validator';

/**
 * 데이터 입력
 */
export class CreateWorkerDto {
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
    message: '비밀번호는 필수 입력 항목입니다.',
  })
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, {
    message:
      '비밀번호는 영문과 숫자, 특수기호 조합하여 6자리 이상 입력하셔야 합니다. ',
  })
  @ApiProperty({
    description: '관리자 비밀번호',
    required: true,
  })
  workerPw: string;

  @IsNotEmpty({
    message: '관리자명은 필수 입력 항목입니다.',
  })
  @ApiProperty({
    description: '관리자명',
    required: true,
  })
  workerName: string;

  @IsArray({
    message: '작업 진로는 반드시 선택하셔야 합니다.',
  })
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @ApiProperty({
    description: '작업 진로',
    required: true,
  })
  courses: number[];
}

export class UpdateWorkerDto {
  @IsNotEmpty({
    message: '관리자명은 필수 입력 항목입니다.',
  })
  @ApiProperty({
    description: '관리자명',
    required: true,
  })
  workerName: string;

  @IsArray({
    message: '작업 진로는 반드시 선택하셔야 합니다.',
  })
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @ApiProperty({
    description: '작업 진로',
    required: true,
  })
  courses: number[];
}
