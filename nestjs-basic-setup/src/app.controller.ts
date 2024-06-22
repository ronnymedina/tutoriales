import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';

export class AppDto {
  @ApiProperty({ example: 'demo' })
  @IsString()
  name: string;
}

@Controller({
  version: '1',
  path: 'demo',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Body() data: AppDto): string {
    return this.appService.getHello();
  }
}
