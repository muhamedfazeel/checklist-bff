import {
  Controller,
  HttpStatus,
  NotAcceptableException,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CustomValidationPipe } from 'src/pipes/custom-validation.pipe';
import { GetGoogleCredentialToken } from 'src/decorators/get-google-credential.decorator';
import { LoginResponseDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new CustomValidationPipe())
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ status: HttpStatus.OK, type: LoginResponseDto })
  async login(
    @GetGoogleCredentialToken() token: string,
  ): Promise<LoginResponseDto> {
    if (!token)
      throw new NotAcceptableException('Provide valid Google credential token');
    return this.authService.login(token);
  }
}
