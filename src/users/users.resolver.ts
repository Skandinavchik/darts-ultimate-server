import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [User], { name: 'users' })
  async findMany() {
    return await this.usersService.findMany()
  }
}
