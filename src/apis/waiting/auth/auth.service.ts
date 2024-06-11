import { HttpStatus, Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { OfficeRepository } from '@app/repositories';
import { TokenService } from 'src/apis/Token/token.service';
import { CustomException } from '@app/common';
import { TokenServiceName } from '@app/enum';
import { TokenDto } from '@app/dto/token';

@Injectable()
export class AuthService {
  constructor(
    private readonly officeRepository: OfficeRepository,
    private readonly tokenService: TokenService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { userId, userPw } = signinDto;
    const result = await this.officeRepository.findByOfficeIDAndOfficePw(
      userId,
      userPw,
    );

    if (!result) {
      throw new CustomException('AUTH_NOT_MATCH', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.tokenService.createToken({
      serviceName: TokenServiceName.Waiting,
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
   * @param userId
   * @returns
   */
  async refresh(userId: number): Promise<TokenDto> {
    const token = await this.tokenService.createToken({
      serviceName: TokenServiceName.Waiting,
      targetID: userId,
    });

    return token;
  }

  /**
   * 로그아웃을 한다.
   *
   * @param userId
   * @returns
   */
  async signout(userId: number) {
    return await this.tokenService.removeByTarget(
      TokenServiceName.Waiting,
      userId,
    );
  }
}
