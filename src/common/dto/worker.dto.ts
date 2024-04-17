import { OfficeDto } from './office.dto';
import { TokenDto } from './token.dto';

export class WorkerDto {
  office: OfficeDto;
  workerID: string;
  workerName: string;
  deviceToken?: string | null;
  expireAt?: string | null;
  token: TokenDto;
}
