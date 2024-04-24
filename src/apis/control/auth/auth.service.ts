import { OfficeRepository } from '@app/repositories';
import { HttpStatus, Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { CustomException } from '@app/common';
import { TokenService } from 'src/apis/Token/token.service';
import { TokenServiceName } from '@app/enum';
import { OfficeDto } from './dto/office.dto';
import { TokenDto } from '@app/dto/token';

@Injectable()
export class AuthService {
  constructor(
    private readonly officeRepository: OfficeRepository,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * 로그인
   *
   * @param signinDto
   * @returns
   */
  async signin(signinDto: SigninDto): Promise<OfficeDto> {
    const { userId, userPw } = signinDto;
    const result = await this.officeRepository.findByOfficeIDAndOfficePw(
      userId,
      userPw,
    );

    if (!result) {
      throw new CustomException('AUTH_NOT_MATCH', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.tokenService.createToken({
      serviceName: TokenServiceName.Control,
      targetID: result.officeID,
    });

    delete result.officeSigninPw;

    return {
      ...result,
      token,
    };
  }

  /**
   * token 변경
   * @param officeID
   * @returns
   */
  async refresh(officeID: number): Promise<TokenDto> {
    const exists = await this.officeRepository.existsByOfficeID(officeID);

    if (!exists) {
      throw new CustomException('AUTH_NOT_MATCH', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.tokenService.createToken({
      serviceName: TokenServiceName.Control,
      targetID: officeID,
    });

    return token;
  }

  /**
   * 로그아웃을 한다.
   *
   * @param officeID
   * @returns
   */
  async signout(officeID: number) {
    const exists = await this.officeRepository.existsByOfficeID(officeID);

    if (!exists) {
      throw new CustomException('AUTH_NOT_MATCH', HttpStatus.UNAUTHORIZED);
    }

    return await this.tokenService.removeByTarget(
      TokenServiceName.Waiting,
      officeID,
    );
  }
}
