import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from './kakao.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stratedy';
import { JwtRefreshStrategy } from './jwt-refresh.stratedy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'kakao' }),    
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60m' },
  }),
],
  controllers: [AuthController],
  providers: [
    AuthService,
    KakaoStrategy,
    PrismaService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}