import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller('pdf')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate')
  async generatePdf(@Body('html') html: string, @Res() res: Response) {
    const pdfBuffer = await this.appService.generatePdf(html);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="conteudo.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);

    res.end(pdfBuffer);
  }
}
