import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service'; // AuthService를 사용할 경우 추가
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;

  // Mock 객체
  const mockRequest = {
    user: {
      refreshToken: 'some-refresh-token',
    },
  };

  const mockResponse = {
    cookie: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  // Mock AuthGuard를 설정
  class MockAuthGuard {
    canActivate(context: ExecutionContext): boolean {
      return true; // 항상 통과하도록 설정
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthGuard('kakao'), // 실제 AuthGuard 대신 모의 객체로 대체
          useClass: MockAuthGuard,
        },
        // AuthService를 사용할 경우 아래 주석을 해제하고 mock 처리
        {
          provide: AuthService,
          useValue: {}, // 필요한 경우 AuthService의 메서드를 mock 처리
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('kakaoLogin', () => {
    it('should call kakaoLogin method', () => {
      // kakaoLogin 메서드 호출을 확인
      const result = authController.kakaoLogin();
      expect(result).toBeUndefined(); // 리다이렉트이므로 반환값 없음
    });
  });

  describe('kakaoCallback', () => {
    it('should set a cookie and return user data', () => {
      // kakaoCallback 메서드 테스트
      authController.kakaoCallback(mockRequest, mockResponse);

      // 쿠키 설정 확인
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refreshToken',
        mockRequest.user.refreshToken,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: 'strict',
        },
      );

      // JSON 응답 확인
      expect(mockResponse.json).toHaveBeenCalledWith({ user: mockRequest.user });
    });
  });
});