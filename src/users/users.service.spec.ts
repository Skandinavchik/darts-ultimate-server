import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService
  let prismaService: PrismaService

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        findMany: jest.fn(),
      },
    }
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile()

    service = moduleRef.get<UsersService>(UsersService)
    prismaService = moduleRef.get<PrismaService>(PrismaService)
  })

  it('users service should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findMany', () => {
    it('should return an array of users', async () => {
      const mockUsers = [{
        id: '1',
        fullname: 'John Doe',
        email: 'john@example.com',
      }]

      prismaService.user.findMany = jest.fn().mockResolvedValue([{
        id: '1',
        fullname: 'John Doe',
        email: 'john@example.com',
      }])

      const result = await service.findMany()

      expect(result).toEqual(mockUsers)
      expect(prismaService.user.findMany).toHaveBeenCalledTimes(1)
    })

    it('should throw an error when prisma fails', async () => {
      prismaService.user.findMany = jest.fn().mockRejectedValue(new Error('Database Error'))
      await expect(service.findMany()).rejects.toThrow('Database Error')
    })
  })
})
