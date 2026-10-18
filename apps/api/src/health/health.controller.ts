import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestValidationDto } from '../common/dto/test-validation.dto';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
    };
  }

  @Post('test-validate')
  testValidation(@Body() body: TestValidationDto) {
    return {
      received: body.name,
    };
  }
}
