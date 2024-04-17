import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TokenServiceName, TokenType } from '../enum';

@Entity({
  name: 'TBLtoken',
  comment: '세션 스토리지 토큰',
})
export class Token {
  @PrimaryGeneratedColumn({
    name: 'TokenID',
    type: 'int',
    comment: '토큰 구분 아이디',
  })
  tokenID: number;

  @Column({
    name: 'ServiceName',
    type: 'varchar',
    length: 255,
    enum: TokenServiceName,
    comment: '대상 서비스 명',
  })
  serviceName: TokenServiceName;

  @Column({
    name: 'TargetID',
    type: 'int',
    length: 11,
    comment: '대상 구분 아이디',
  })
  targetID: number;

  @Column({
    name: 'TokenType',
    type: 'tinyint',
    length: 4,
    enum: TokenType,
    default: TokenType.Access,
    comment: '토큰 타입',
  })
  tokenType: TokenType;

  @Column({
    name: 'ExpireAt',
    type: 'timestamp',
    comment: '토큰 만료 시간',
  })
  expireAt: Date;

  @CreateDateColumn({
    name: 'CreatedAt',
    type: 'timestamp',
    comment: '생성 일자',
  })
  createdAt: Date;

  @Column({
    name: 'LastUsedAt',
    type: 'timestamp',
    nullable: true,
    comment: '마지막으로 사용된 시간',
  })
  lastUsedAt: Date;
}
