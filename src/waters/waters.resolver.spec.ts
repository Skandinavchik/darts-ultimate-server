import { Test, TestingModule } from '@nestjs/testing'
import { WatersResolver } from './waters.resolver'
import { WatersService } from './waters.service'

describe('WatersResolver', () => {
  let resolver: WatersResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatersResolver, WatersService],
    }).compile()

    resolver = module.get<WatersResolver>(WatersResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
