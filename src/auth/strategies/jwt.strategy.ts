import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'

const cookieExtractor = (req: Request): string | null => {
  return req?.cookies?.access_token || null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate({ id, email }: { id: string, email: string }) {
    return { id, email }
  }
}
