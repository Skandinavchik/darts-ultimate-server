import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany()
    } catch (error) {
      throw new Error(error)
    }
  }
}
