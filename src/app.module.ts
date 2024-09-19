import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './feature/rest/oauth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
    }),
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
