import { Module } from '@nestjs/common';
import { CustomLoggerModule } from 'src/custom-logger/custom-logger.module';
import { HttpRestModule } from 'src/http-rest/http-rest.module';
import { UtilsModule } from 'src/utils/utils.module';

const sharedModules = [CustomLoggerModule, HttpRestModule, UtilsModule];

@Module({
  imports: sharedModules,
  exports: sharedModules,
})
export class CommonModule {}
