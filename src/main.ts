import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const host = process.env.HOST
  const port = process.env.PORT
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors()
  app.use(cookieParser())
  app.setGlobalPrefix('api')

  await app.listen(port, () => {
    console.log(`Started on ${host}:${port} 🚀🚀🚀`)
  })
}

bootstrap()
