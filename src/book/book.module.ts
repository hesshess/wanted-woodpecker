import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { HttpModule } from '@nestjs/axios';
import { BookResolver } from './book.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [HttpModule],
  controllers: [BookController],
  providers: [BookService, BookResolver,JwtService],
})
export class BookModule {}