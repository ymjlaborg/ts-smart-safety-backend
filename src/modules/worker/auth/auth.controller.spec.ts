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

  it('signin 호출 시 body에 데이터를 넣지 않으면 오류가 발생한다.', async () => {
    const signinDto: SigninDto = new SigninDto();
    signinDto.officeID = 2;
    signinDto.workerPw = '1q2w3e4r!';

    const result = await controller.signin(signinDto);
    expect(result).toHaveProperty('status');
    expect(result.status).toBe(401);
  });
});
