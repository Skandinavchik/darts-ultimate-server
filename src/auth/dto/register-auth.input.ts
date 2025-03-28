import { Field, InputType, PickType } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'

@InputType()
export class RegisterInput extends PickType(User, ['fullname', 'email'] as const, InputType) {
  @Field()
  password: string

}
