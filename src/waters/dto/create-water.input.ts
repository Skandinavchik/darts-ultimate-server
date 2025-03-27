import { InputType, OmitType } from '@nestjs/graphql'
import { WaterEntity } from '../entities/water.entity'

@InputType()
export class CreateWaterInput extends OmitType(WaterEntity, ['id', 'createdAt', 'updatedAt'] as const, InputType) {}
