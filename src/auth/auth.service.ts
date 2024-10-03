import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  // Kakao ID로 사용자 찾기
  async findUserByKakaoId(providerId: string) {
    return this.prisma.user.findUnique({
        where: {
            provider_providerId: {
              provider: 'kakao',
              providerId: providerId.toString(),
            },
          },
    });
  }
  // 새로운 사용자 등록
  async registerUser(profileData: {
    provider: 'kakao' | string;
    providerId: string;
    refreshToken: string;
    username: string;
  }) {
    return this.prisma.user.create({
      data: {
        provider: profileData.provider,
        providerId: profileData.providerId.toString(),
        refreshToken: profileData.refreshToken,
        username: profileData.username, // username 추가
      },
    });
  }
  async updateUserRefreshToken(
    userId: number,
    { refreshToken }: { refreshToken: string },
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
}