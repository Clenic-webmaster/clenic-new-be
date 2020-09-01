import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { security } from '../../utils/constants';
import { UserService } from 'src/api/user/user.service';
import { AuthService } from '../auth.service';
import { use } from 'passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: security.secret,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: any) {
    const jwt = req.headers['authorization'].split(' ')[1]; // SEPARATING TOKEN FROM BEARER
    const userId = payload.userId;
    if (jwt && userId) {
      if (await this._authService.checkJWtInSession(jwt, userId)) {
        return payload;
      } else {
        throw new UnauthorizedException('The token sended is not valid')
      }
    } else {
      throw new UnauthorizedException()
    }
  }
}