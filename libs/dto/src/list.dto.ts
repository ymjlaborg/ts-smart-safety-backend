import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

/**
 * 리스트 DTO
 *
 * @author Bart
 * @version 1.0
 */
export class ListDto {
  @Expose()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: '페이지는 숫자만 입력할 수 있습니다.' },
  )
  @ApiPropertyOptional({
    title: '페이지',
    description: '리스트 페이지',
    example: 1,
  })
  page: number = 1;

  @ApiPropertyOptional({
    title: '리미트',
    description: '1페이지당 보여줄 데이터 수',
    example: 10,
  })
  @Expose()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: '데이터 수는 숫자만 입력할 수 있습니다.' },
  )
  @IsOptional()
  limit: number = 10;

  @Expose()
  @Transform(({ obj }) => {
    const { page, limit } = obj;
    return (page - 1) * limit;
  })
  offset: number;
}
