import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  let prismaService: PrismaService
  let jwtService: JwtService

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        create: jest.fn(),
        findUniqueOrThrow: jest.fn(),
      },
    }

    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mocked-access-token'),
    }

    const moduleRef: TestingModule = await Test.createTestingModule({

      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile()

    service = moduleRef.get(AuthService)
    prismaService = moduleRef.get<PrismaService>(PrismaService)
    jwtService = moduleRef.get<JwtService>(JwtService)
  })

  it('auth service should be defined', () => {
    expect(service).toBeDefined()
  })
})
