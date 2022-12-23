import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {

  private readonly logger = new Logger(BillingService.name);

  getHello(): string {
    return 'Hello World!';
  }

  bill(data: any) {
    this.logger.log('Billing...', data);
  }
}
