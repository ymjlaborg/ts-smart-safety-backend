import { DeviceEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, MoreThan, Repository } from 'typeorm';

@Injectable()
export class DeviceRepository extends Repository<DeviceEntity> {
  constructor(private dataSource: DataSource) {
    super(DeviceEntity, dataSource.createEntityManager());
  }

  async countDevStatusByUserID(userID: string) {
    const connection = await this.count({
      where: {
        userID,
        devStatus: 0,
      },
    });

    const disconnection = await this.count({
      where: {
        userID,
        devStatus: MoreThan(0),
      },
    });

    return {
      connection,
      disconnection,
    };
  }
}
