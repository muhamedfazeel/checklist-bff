import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { CustomLogger } from 'src/custom-logger/custom-logger.service';
import { HttpRestService } from 'src/http-rest/http-rest.service';
import { JwtTokenService } from 'src/jwt/jwt.service';
import { UtilsService } from 'src/utils/utils.service';
import { LoginDataDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
    private readonly logger: CustomLogger,
    private readonly utilsService: UtilsService,
    private readonly httpService: HttpRestService,
    private readonly jwtService: JwtTokenService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async login(credentialToken: string): Promise<any> {
    try {
      const url = `${this.utilsService.getMainApiUrl()}/auth/login`;
      const response = await this.httpService.post<LoginDataDto>(url, {
        token: credentialToken,
      });
      const data = response.data;
      const user = data?.user;

      if (!response.success || !response.data) {
        throw new NotFoundException(response.message);
      } else {
        const payload = {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.type === 'ADMIN' ? true : false,
          },
        };
        const token = this.jwtService.sign(payload);
        return { token };
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
