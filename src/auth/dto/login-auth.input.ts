import { InputType, OmitType } from '@nestjs/graphql'
import { RegisterInput } from './register-auth.input'

@InputType()
export class LoginInput extends OmitType(RegisterInput, ['fullname'] as const) {}
