import { UnauthorizedException } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Request, Response } from 'express'
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
    const { user, accessToken, refreshToken } = await this.authService.register(registerInput)

    context.res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    })

    context.res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return user
  }

  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: { res: Response },
  ) {
    const { user, accessToken, refreshToken } = await this.authService.login(loginInput)

    context.res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    })

    context.res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return user
  }

  @Mutation(() => String)
  async refreshToken(
    @Context() context: { req: Request; res: Response },
  ): Promise<string> {
    const refreshToken = context.req.cookies['refresh_token']

    if (!refreshToken) throw new UnauthorizedException('No refresh token provided')

    const newAccessToken = await this.authService.refreshAccessToken(refreshToken)

    context.res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    })

    return 'success'
  }
}
