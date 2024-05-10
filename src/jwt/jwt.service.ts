import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import configuration from 'src/config/configuration';
import { CustomLogger } from 'src/custom-logger/custom-logger.service';
import { TokenDto } from 'src/common/dto/token.dto';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext(JwtTokenService.name);
  }

  /**
   * Method to generate an access token and a refresh token.
   * @param {number} userId Member ID of the user.
   * @param {string} userName of the user.
   * @returns {Promise<TokenDto>} Access token and refresh token.
   */
  async sign(payload: PayloadDto): Promise<TokenDto> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: this.config.jwt.secret,
          expiresIn: this.config.jwt.expiresIn,
        }),
        this.jwtService.signAsync(payload, {
          secret: this.config.jwt.refreshSecret,
          expiresIn: this.config.jwt.refreshExpiresIn,
        }),
      ]);

      return { accessToken, refreshToken };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
