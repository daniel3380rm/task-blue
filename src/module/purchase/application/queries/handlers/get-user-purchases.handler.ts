import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserPurchasesQuery } from '../get-user-purchases.query';
import { PurchaseService } from '../../purchase.service';

@QueryHandler(GetUserPurchasesQuery)
export class GetUserPurchasesHandler
  implements IQueryHandler<GetUserPurchasesQuery>
{
  constructor(private readonly purchaseService: PurchaseService) {}

  async execute(query: GetUserPurchasesQuery) {
    return this.purchaseService.getUserPurchases(query.userId);
  }
}
