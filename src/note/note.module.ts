import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  providers: [NoteService, NoteResolver, PrismaService, JwtService],
})
export class NoteModule {}