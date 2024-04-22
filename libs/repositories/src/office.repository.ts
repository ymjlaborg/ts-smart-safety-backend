import { ListOfficeDto } from '@app/dto';
import { OfficeEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OfficeRepository extends Repository<OfficeEntity> {
  constructor(private dataSource: DataSource) {
    super(OfficeEntity, dataSource.createEntityManager());
  }

  /**
   * 존재하는 사업소 인지 확인
   *
   * @param officeID
   * @returns
   */
  async existsByOfficeID(officeID: number): Promise<boolean> {
    return await this.existsBy({
      officeID,
    });
  }

  /**
   * 모든 접속 정보를 가져온다.
   * @returns
   */
  async findAll(): Promise<ListOfficeDto[]> {
    const query = this.createQueryBuilder('office')
      .select(['office.officeID', 'office.officeName'])
      .where('office.isAdmin != :isAdmin', { isAdmin: 1 });

    return await query.getMany();
  }

  /**
   * 아이디, 비밀번호 일치한 정보 찾기
   *
   * @param officeID
   * @param officePw
   * @returns
   */
  async findByOfficeIDAndOfficePw(officeID: string, officePw: string) {
    const query = this.createQueryBuilder('office').where(
      'office.officeSigninID = :officeID AND office.officeSigninPw = PASSWORD(:officePw)',
      {
        officeID,
        officePw,
      },
    );

    return await query.getOne();
  }
}
