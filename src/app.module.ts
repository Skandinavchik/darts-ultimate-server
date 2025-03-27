import { Module } from '@nestjs/common'
import { EnvConfigModule } from './configs/env-config.module'
import { GraphqlConfigModule } from './configs/graphql.config.module'
import { WatersModule } from './waters/waters.module'
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    EnvConfigModule,
    GraphqlConfigModule,
    WatersModule,
    PrismaModule,
  ],
})
export class AppModule {}
