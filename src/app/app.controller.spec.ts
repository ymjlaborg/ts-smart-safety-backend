import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('"message" 프로퍼티가 JSON 응답 객체에 존재한다.', async () => {
    const result = await controller.getData();
    expect(result).toHaveProperty('message');
  });

  it('"message" 프로퍼티의 응답 값은 "Welcome To SYSTEM...!"이다.', async () => {
    const result = await controller.getData();
    expect(result.message).toBe('Welcome To SYSTEM...!');
  });
});
