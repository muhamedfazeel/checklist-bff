import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';

@ApiTags('Health')
@Controller('health.html')
export class HealthController {
  @Get()
  @Public()
  @ApiOperation({ summary: 'Check server health' })
  @ApiOkResponse({ type: SuccessResponseDto })
  getHealth(): SuccessResponseDto {
    return;
  }
}
