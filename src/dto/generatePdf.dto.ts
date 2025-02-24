import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator';

export class GeneratePdfDto {
  @IsString()
  @ApiProperty({
    description: 'HTML que será convertido em PDF',
    example: "<h1 style='background: red;'>Gerador de PDF</h1>",
  })
  html: string;
}