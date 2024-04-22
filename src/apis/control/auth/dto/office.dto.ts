import { ApiProperty } from '@nestjs/swagger';

class TokenDto {
  @ApiProperty({
    name: '접근 토큰',
    type: String,
  })
  accessToken: string;

  @ApiProperty({
    name: '갱신 토큰',
    type: String,
  })
  refreshToken?: string;
}

export class OfficeDto {
  @ApiProperty({
    name: '검사소 구분 아이디',
    type: Number,
  })
  officeID: number;

  @ApiProperty({
    name: '검사소 아이디',
    type: String,
  })
  officeSigninID: string;

  @ApiProperty({
    name: '검사소명',
    type: String,
  })
  officeName: string;

  @ApiProperty({
    name: '관리자 여부',
    type: String,
  })
  isAdmin: number;

  @ApiProperty({
    name: '토큰 정보',
    type: String,
  })
  token: TokenDto;
}
