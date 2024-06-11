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
  async refresh(userId: number): Promise<TokenDto> {
    const token = await this.tokenService.createToken({
      serviceName: TokenServiceName.Control,
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
      TokenServiceName.Control,
      userId,
    );
  }
}
