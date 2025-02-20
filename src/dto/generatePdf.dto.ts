import { ApiProperty } from "@nestjs/swagger";

export class GeneratePdfDto {
  @ApiProperty({
    description: 'HTML que será convertido em PDF',
    example: "<h1 style='background: red;'>Gerador de PDF</h1>",
  })
  html: string;
}