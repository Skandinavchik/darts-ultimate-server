import { Field, ObjectType } from '@nestjs/graphql'
import { User as PrismaUser } from '@prisma/client'

@ObjectType()
export class User implements Omit<PrismaUser, 'password'> {
  @Field()
  id: string

  @Field()
  fullname: string

  @Field(() => String, { nullable: true })
  username: string | null

  @Field()
  email: string

  @Field()
  emailVerified: boolean

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
