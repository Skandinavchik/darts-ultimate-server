import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { WatersResolver } from './waters.resolver'
import { WatersService } from './waters.service'

@Module({
  imports: [PrismaModule],
  providers: [WatersResolver, WatersService],
})
export class WatersModule {}
