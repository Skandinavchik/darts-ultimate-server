import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { genSalt, hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from 'src/users/entities/user.entity'
import { AuthPayload } from './auth.types'
import { LoginInput } from './dto/login-auth.input'
import { RegisterInput } from './dto/register-auth.input'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<{ user: User; token: string }> {
    const { fullname, email, password } = registerInput

    try {
      const hashedPassword = await this.hashPassword(password)

      const user: User = await this.prisma.user.create({
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

      const token = await this.jwtService.signAsync(payload)

      return { user, token }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002')
        throw new ConflictException('User with this email already exists')

      throw new BadRequestException('Something went wrong')
    }
  }

  async login(loginAuthInput: LoginInput): Promise<string> {
    try {
      console.log(loginAuthInput)

      return 'success'
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async logout() {
    return 'Logged out'
  }

  async hashPassword(password: string, saltRounds = 12): Promise<string> {
    const salt = await genSalt(saltRounds)
    return await hash(password, salt)
  }
}
