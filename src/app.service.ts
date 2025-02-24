import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';

@Injectable()
export class AppService {
  async generatePdf(html: string) {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    return pdfBuffer;
  }
}