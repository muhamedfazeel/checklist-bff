import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  id: number;
  email: string;
  name: string;
  type: string;
}

class DataDto {
  user: UserDto;
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
