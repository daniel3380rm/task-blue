import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPurchasesQuery } from '../get-all-purchases.query';
import { PurchaseService } from '../../purchase.service';

@QueryHandler(GetAllPurchasesQuery)
export class GetAllPurchasesHandler implements IQueryHandler<GetAllPurchasesQuery> {
  constructor(private readonly purchaseService: PurchaseService) {}

  async execute() {
    return this.purchaseService.getAllPurchases();
  }
}