import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';

@ApiTags('Health')
@Controller('status')
export class HealthController {
  @Get()
  @Public()
  @ApiOperation({ summary: 'Get status of server' })
  @ApiResponse({ type: SuccessResponseDto, status: HttpStatus.OK })
  statusCheck(): SuccessResponseDto {
    return;
  }
}
