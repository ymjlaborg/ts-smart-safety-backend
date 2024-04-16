import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

describe('worker/AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('signin 호출 시 아이디 또는 비밀번호를 입력하지 않으면 status 프로퍼티가 401이 발생된다.', async () => {
    const signinDto: SigninDto = new SigninDto();
    signinDto.userPw = '1q2w3e4r!';

    const result = await controller.signin(signinDto);
    expect(result).toHaveProperty('status');
    expect(result.status).toBe(401);
  });
});
