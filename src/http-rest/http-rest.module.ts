import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomLoggerModule } from 'src/shared/custom-logger/custom-logger.module';
import { HttpRestService } from './http-rest.service';
import { CONTENT_TYPE } from 'src/shared/constants';

@Module({
  imports: [
    CustomLoggerModule,
    HttpModule.registerAsync({
      inject: ['REQUEST'],
      useFactory: async (req: Request) => ({
        transformRequest: [
          (data, headers) => {
            headers['uniqueId'] = req?.headers?.['uniqueId'];

            // Checking header has form-urlencoded content type
            const header = headers['Content-Type'];
            const isHeaderUrlEncoded = header === CONTENT_TYPE.FORM_URL_ENCODED;

            // Adding content type only when request body is present
            if (data) {
              headers['Content-Type'] = `${
                isHeaderUrlEncoded
                  ? CONTENT_TYPE.FORM_URL_ENCODED
                  : CONTENT_TYPE.JSON
              } ; charset=utf-8`;
              headers['Accept'] = CONTENT_TYPE.JSON;
            }

            return isHeaderUrlEncoded ? data : JSON.stringify(data);
          },
        ],
      }),
    }),
  ],
  exports: [HttpRestService],
  providers: [HttpRestService],
})
export class HttpRestModule {}
