import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  async searchBooks(
    @Query('keyword') keyword: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const result = await this.bookService.searchBooks(
      keyword,
      page ?? 0,
      limit ?? 20,
    );
    return { ...result };
  }
}