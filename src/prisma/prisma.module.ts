import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 다른 모듈에서도 사용할 수 있도록 export
})
export class PrismaModule {}