import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { PrismaService } from '../../../prisma/prisma.service'; // PrismaService 임포트

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService, // PrismaService 주입
  ) {}

  @Get('kakao')
  async kakaoLogin(@Query('code') code: string, @Res() res: Response) {
    const accessToken = await this.authService.getAccessToken(code);
    const kakaoUser = await this.authService.getKakaoUser(accessToken);

    // 사용자 정보에서 필요한 필드 추출
    const { id, email, nickname } = kakaoUser;

    // 사용자 데이터베이스에서 체크
    let user = await this.prisma.user.findUnique({
      where: { email }, // 이메일로 사용자 조회
    });

    // 사용자가 없으면 새로 생성
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name: nickname, // 또는 다른 필드
          // 추가 정보가 필요한 경우 여기서 설정
        },
      });
    }

    // 사용자 정보를 클라이언트에게 반환
    res.json(user);
  }
}