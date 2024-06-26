import { PassportStrategy } from '@nestjs/passport';
import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configuration from 'src/config/configuration';
import { CustomLogger } from 'src/custom-logger/custom-logger.service';
import { TokenPayload } from '../interface/token-payload.interface';
import * as K from 'src/common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  K.JWT_STRATEGY.DEFAULT,
) {
  constructor(
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
    private readonly logger: CustomLogger,
  ) {
    logger.setContext(JwtStrategy.name);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: TokenPayload): Promise<TokenPayload> {
    try {
      const accessTokenFromHeader = req?.headers?.authorization
        ?.replace('Bearer', '')
        .trim();
      if (!accessTokenFromHeader) {
        throw new UnauthorizedException(K.ERROR_CODES.INVALID_ACCESS_TOKEN);
      }

      const { userId } = payload;
      if (!userId) {
        throw new UnauthorizedException(K.ERROR_CODES.INVALID_ACCESS_TOKEN);
      }

      return payload;
    } catch (error) {
      this.logger.error('JWT Token error: ', error);
      throw error;
    }
  }
}
