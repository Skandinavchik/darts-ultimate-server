import { Test, TestingModule } from '@nestjs/testing'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

describe('UsersResolver', () => {
  let resolver: UsersResolver
  let usersService: UsersService

  beforeEach(async () => {
    const mockUserService = {
      findMany: jest.fn().mockResolvedValue([{
        id: '1',
        fullname: 'John Doe',
        email: 'john@example.com',
      }]),
    }

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compile()

    resolver = moduleRef.get<UsersResolver>(UsersResolver)
    usersService = moduleRef.get<UsersService>(UsersService)
  })

  it('users resolver should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('findMany', () => {
    it('should call findMany and return an array of users', async () => {
      const result = await resolver.findMany()
      expect(result).toEqual([{
        id: '1',
        fullname: 'John Doe',
        email: 'john@example.com',
      }])

      expect(usersService.findMany).toHaveBeenCalledTimes(1)
    })

    it('should return an empty array if no users found', async () => {
      usersService.findMany = jest.fn().mockResolvedValue([])

      const result = await resolver.findMany()
      expect(result).toEqual([])

      expect(usersService.findMany).toHaveBeenCalledTimes(1)
    })
  })
})
