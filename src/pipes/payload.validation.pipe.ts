import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ERROR_CODES } from '../shared/constants';

Injectable();
export class PayloadValidationPipe implements PipeTransform {
  transform(payload: any): any {
    if (!payload || !Object.keys(payload)?.length) {
      throw new BadRequestException(ERROR_CODES.REQUEST_BODY_EMPTY);
    }

    return payload;
  }
}
