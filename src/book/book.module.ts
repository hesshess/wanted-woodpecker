import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { HttpModule } from '@nestjs/axios';
import { BookResolver } from './book.resolver';

@Module({
  imports: [HttpModule],
  controllers: [BookController],
  providers: [BookService, BookResolver],
})
export class BookModule {}