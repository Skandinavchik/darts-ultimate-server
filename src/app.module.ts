import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { EnvConfigModule } from './configs/env-config.module'
import { GraphqlConfigModule } from './configs/graphql.config.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    EnvConfigModule,
    GraphqlConfigModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
