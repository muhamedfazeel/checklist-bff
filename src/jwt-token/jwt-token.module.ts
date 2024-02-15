import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import configuration from 'src/config/configuration';
import { JWT_ALGORITHM } from 'src/shared/constants';
import { CustomLoggerModule } from 'src/shared/custom-logger/custom-logger.module';
import { JwtTokenService } from './jwt-token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigType<typeof configuration>) => ({
        secret: config.jwt.secret,
        signOptions: { expiresIn: config.jwt.expiry, algorithm: JWT_ALGORITHM },
      }),
      inject: [configuration.KEY],
    }),
    PassportModule,
    CustomLoggerModule,
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService, JwtModule],
})
export class JwtTokenModule {}
