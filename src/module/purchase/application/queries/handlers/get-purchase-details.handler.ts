import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPurchaseDetailsQuery } from '../get-purchase-details.query';
import { PurchaseService } from '../../purchase.service';

@QueryHandler(GetPurchaseDetailsQuery)
export class GetPurchaseDetailsHandler
  implements IQueryHandler<GetPurchaseDetailsQuery>
{
  constructor(private readonly purchaseService: PurchaseService) {}

  async execute(query: GetPurchaseDetailsQuery) {
    return this.purchaseService.getPurchaseDetails(query.purchaseId);
  }
}
