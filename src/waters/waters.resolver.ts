import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateWaterInput } from './dto/create-water.input'
import { WaterEntity } from './entities/water.entity'
import { WatersService } from './waters.service'

@Resolver(() => WaterEntity)
export class WatersResolver {
  constructor(private readonly watersService: WatersService) {}

  @Mutation(() => WaterEntity)
  async createWater(@Args('createWaterInput') createWaterInput: CreateWaterInput) {
    return await this.watersService.create(createWaterInput)
  }

  @Query(() => [WaterEntity], { name: 'waters' })
  async findAll() {
    return await this.watersService.findAll()
  }
}
