import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from 'src/graphql';
import { CreateBookInput } from './dto/create-book.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query(() => Book)
  async book(@Args('id') id: number) {
    return await this.bookService.findOneById(id);
  }

  @Mutation(() => Book)
  async createBook(
    @Args('userId') userId: number,
    @Args('input') input: CreateBookInput,
  ) {
    const book = await this.bookService.create(userId, input);
    return book;
}

  @Mutation(() => Book)
  async likeBook(
    @Args('userId') userId: number,
    @Args('bookId') bookId: number,
  ) {
    const book = await this.bookService.likeBook(userId, bookId);
    return book;
}
}