import { WorkerStatus } from '@app/enum';
import { OfficeDto } from './office.dto';
import { TokenDto } from './token';

export class WorkerDto {
  id: number;
  workerID: string;
  workerName: string;
  workerStatus: WorkerStatus;
  mobileToken?: string;
  watchToken?: string;
  expireAt?: Date;
  office: OfficeDto;
  token: TokenDto;
}
