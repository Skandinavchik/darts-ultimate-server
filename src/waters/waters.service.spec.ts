import { Test, TestingModule } from '@nestjs/testing'
import { WatersService } from './waters.service'

describe('WatersService', () => {
  let service: WatersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatersService],
    }).compile()

    service = module.get<WatersService>(WatersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
