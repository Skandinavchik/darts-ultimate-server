import { Field, ObjectType } from '@nestjs/graphql'
import { Water } from '@prisma/client'

@ObjectType()
export class WaterEntity implements Water {
  @Field()
  id: string

  @Field()
  serialNumber: string

  @Field()
  title: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
