import { IsNotEmpty, IsString } from 'class-validator';

export class TestValidationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
