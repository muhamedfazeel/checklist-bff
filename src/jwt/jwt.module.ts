import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_ALGORITHM } from 'src/common/constants';
import configuration from 'src/config/configuration';
import { CustomLoggerModule } from 'src/custom-logger/custom-logger.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshStrategy } from './strategy/jwt.refresh.strategy';
import { JwtTokenService } from './jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigType<typeof configuration>) => ({
        secret: config.jwt.secret,
        signOptions: {
          expiresIn: config.jwt.expiresIn,
          algorithm: JWT_ALGORITHM,
        },
      }),
      inject: [configuration.KEY],
    }),
    PassportModule,
    CustomLoggerModule,
  ],
  providers: [JwtTokenService, JwtStrategy, JwtRefreshStrategy],
  exports: [JwtTokenService, JwtModule],
})
export class JwtTokenModule {}
