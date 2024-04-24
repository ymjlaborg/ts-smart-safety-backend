import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'TBLdevice',
  comment: '디바이스 정보',
})
export class DeviceEntity {
  @PrimaryColumn({
    name: 'ID',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'USERID',
    type: 'varchar',
    length: 255,
  })
  userID: string;

  @Column({
    name: 'DevID',
    type: 'varchar',
    length: 255,
  })
  devID: string;

  @Column({
    name: 'DevName',
    type: 'varchar',
    length: 255,
  })
  devName: string;

  @Column({
    name: 'DevPw',
    type: 'varchar',
    length: 255,
  })
  devPw: string;

  @Column({
    name: 'DevModel',
    type: 'varchar',
    length: 255,
  })
  devModel: string;

  @Column({
    name: 'DevLocation',
    type: 'varchar',
    length: 255,
  })
  devLocation: string;

  @Column({
    name: 'DevGLA',
    type: 'float',
    nullable: true,
  })
  devGLA?: number;

  @Column({
    name: 'DevGLO',
    type: 'float',
    nullable: true,
  })
  devGLO?: number;

  @Column({
    name: 'DevStatus',
    type: 'tinyint',
  })
  devStatus: number;

  @Column({
    name: 'DevCate',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  devCate?: string;

  @UpdateDateColumn({
    name: 'UDate',
    type: 'timestamp',
  })
  uDate: Date;

  @Column({
    name: 'devToken',
    type: 'varchar',
    length: 50,
  })
  devToken: string;
}
