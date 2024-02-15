import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { CustomLogger } from 'src/shared/custom-logger/custom-logger.service';
import { TokenDto } from 'src/shared/dto/token.dto';

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
   * @param {string | number} userId Member ID of the user.
   * @returns {Promise<TokenDto>} Access token and refresh token.
   */
  async generateTokens(userId: number): Promise<TokenDto> {
    try {
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync({ userId }),
        this.jwtService.signAsync(
          { userId },
          {
            secret: this.config.jwt.refreshSecret,
            expiresIn: this.config.jwt.refreshExpiry,
          },
        ),
      ]);

      return { access_token, refresh_token };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
