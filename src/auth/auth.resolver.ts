import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Response } from 'express'
import { User } from 'src/users/entities/user.entity'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login-auth.input'
import { RegisterInput } from './dto/register-auth.input'

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
    @Context() context: { res: Response },
  ): Promise<User> {
    const { user, token } = await this.authService.register(registerInput)

    context.res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    })

    return user
  }

  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: { res: Response },
  ) {
    const { user, token } = await this.authService.login(loginInput)

    context.res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    })

    return user
  }
}
