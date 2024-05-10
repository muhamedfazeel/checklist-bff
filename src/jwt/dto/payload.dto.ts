import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isAdmin: boolean;
}

export class PayloadDto {
  @ApiProperty()
  user: UserDto;
}
