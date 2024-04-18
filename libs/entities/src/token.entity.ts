import { TokenServiceName, TokenType } from '@app/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'TBLtoken',
  comment: '세션 토큰 관리',
})
export class TokenEntity {
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
    comment: '대상 구분 아이디',
  })
  targetID: number;

  @Column({
    name: 'TokenType',
    type: 'tinyint',
    enum: TokenType,
    comment: '토큰 타입',
  })
  tokenType: TokenType;

  @Column({
    name: 'Token',
    type: 'varchar',
    length: 255,
    comment: '토큰',
  })
  token: string;

  @Column({
    name: 'ExpireAt',
    type: 'timestamp',
    comment: '토큰 만료 시간',
  })
  expireAt: Date;

  @CreateDateColumn({
    name: 'CreatedAt',
    type: 'timestamp',
    comment: '토큰 만료 시간',
  })
  createdAt: Date;

  @Column({
    name: 'LastUsedAt',
    type: 'timestamp',
    comment: '마지막으로 사용된 시간',
  })
  lastUsedAt: Date;
}
