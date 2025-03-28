import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { compare, genSalt, hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from 'src/users/entities/user.entity'
import { AuthPayload } from './auth.types'
import { LoginInput } from './dto/login-auth.input'
import { RegisterInput } from './dto/register-auth.input'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<{ user: User; accessToken: string, refreshToken: string }> {
    const { fullname, email, password } = registerInput

    try {
      const hashedPassword = await this.hashPassword(password)

      const user: User = await this.prismaService.user.create({
        data: {
          fullname,
          email,
          password: hashedPassword,
        },
        omit: {
          password: true,
        },
      })

      const payload: AuthPayload = {
        sub: user.id,
        email: user.email,
      }

      const accessToken = await this.signAccessToken(payload)
      const refreshToken = await this.signRefreshToken(payload)

      return { user, accessToken, refreshToken }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002')
        throw new ConflictException('User with this email already exists')

      throw new BadRequestException('Something went wrong')
    }
  }

  async login(loginAuthInput: LoginInput): Promise<{ user: User; accessToken: string, refreshToken: string }> {
    const { email, password } = loginAuthInput
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { email },
      })

      await this.validateUser(password, user.password)

      const payload: AuthPayload = {
        sub: user.id,
        email: user.email,
      }

      const accessToken = await this.signAccessToken(payload)
      const refreshToken = await this.signRefreshToken(payload)

      return { user, accessToken, refreshToken }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async logout() {
    return 'Logged out'
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      })
      return decoded
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token')
    }
  }

  async signAccessToken(payload: AuthPayload) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      secret: process.env.JWT_SECRET,
    })
  }

  private async signRefreshToken(payload: AuthPayload) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      secret: process.env.JWT_REFRESH_SECRET,
    })
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      })

      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { id: decoded.sub },
      })

      const payload: AuthPayload = {
        sub: user.id,
        email: user.email,
      }

      const newAccessToken = await this.signAccessToken(payload)
      return newAccessToken
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token')
    }
  }

  private async hashPassword(password: string, saltRounds = 12): Promise<string> {
    const salt = await genSalt(saltRounds)
    return await hash(password, salt)
  }

  private async validateUser(password: string, hashedPassword: string) {
    const isPasswordValid = await compare(password, hashedPassword)
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials')
    return isPasswordValid
  }
}
