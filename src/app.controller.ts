import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import { GeneratePdfDto } from './dto/generatePdf.dto';

@ApiTags('PDF')
@Controller('gerar')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  @ApiOperation({ summary: 'Gera um PDF a partir de HTML' })
  @ApiBody({
    type: GeneratePdfDto,
  })
  @ApiResponse({
    status: 200,
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

  async generatePdf(@Body() body: GeneratePdfDto, @Res() res: Response) {
    const { html } = body;
    const pdfBuffer = await this.appService.generatePdf(html);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);

    res.status(200).end(pdfBuffer);
  }
}
