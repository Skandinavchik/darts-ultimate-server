import { Test, TestingModule } from '@nestjs/testing'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

describe('AuthResolver', () => {
  let resolver: AuthResolver
  let authService: AuthService

  beforeEach(async () => {
    const mockAuthService = {
      register: jest.fn(),
      login: jest.fn(),
      refreshAccessToken: jest.fn(),
    }

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile()

    resolver = moduleRef.get<AuthResolver>(AuthResolver)
    authService = moduleRef.get<AuthService>(AuthService)
  })

  it('auth resolver should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
