import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePurchaseCommand } from '../create-purchase.command';
import { PurchaseService } from '../../purchase.service';

@CommandHandler(CreatePurchaseCommand)
export class CreatePurchaseHandler implements ICommandHandler<CreatePurchaseCommand> {
  constructor(private readonly purchaseService: PurchaseService) {}

  async execute(command: CreatePurchaseCommand) {
    return this.purchaseService.createPurchase(command);
  }
}