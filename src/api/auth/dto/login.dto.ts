import { ApiProperty } from '@nestjs/swagger';

class DataDto {
  id: number;
  email: string;
  name: string;
  type: string;
}

class LoginDataTokenDto {
  @ApiProperty()
  accessToken: string;
}

export class LoginDataDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({})
  data: DataDto;
}

export class LoginResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: LoginDataTokenDto;
}
