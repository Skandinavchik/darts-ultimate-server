import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect()
      console.log('DB Connected 💿')
    } catch (error) {
      console.log(error)
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
