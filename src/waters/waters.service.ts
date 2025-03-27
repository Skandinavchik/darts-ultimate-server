import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateWaterInput } from './dto/create-water.input'
import { WaterEntity } from './entities/water.entity'

@Injectable()
export class WatersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createWaterInput: CreateWaterInput): Promise<WaterEntity> {
    try {
      return await this.prismaService.water.create({
        data: createWaterInput,
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) throw new ConflictException()
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  async findAll(): Promise<WaterEntity[]> {
    return await this.prismaService.water.findMany()
  }
}
