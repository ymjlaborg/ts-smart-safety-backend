import { TokenServiceName } from '@app/enum';

export class CreateTokenDto {
  serviceName: TokenServiceName;
  targetID: number;
}
