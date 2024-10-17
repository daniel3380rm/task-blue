import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseController } from './presentation/purchase.controller';
import { PurchaseService } from './application/purchase.service';
import { PurchaseRepository } from './infrastructure/purchase.repository';
import {
  PurchaseDocument,
  PurchaseSchema,
} from './infrastructure/purchase.schema';
import { CreatePurchaseHandler } from './application/commands/handlers/create-purchase.handler';
import { GetUserPurchasesHandler } from './application/queries/handlers/get-user-purchases.handler';
import { GetAllPurchasesHandler } from './application/queries/handlers/get-all-purchases.handler';
import { ProductModule } from '../product/product.module';
import { HistoryService } from '../../shared/history/history.service';
import {
  HistoryDocument,
  HistorySchema,
} from '../../shared/history/history.entity';
import { DefaultUserService } from '../../shared/services/default-user.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: PurchaseDocument.name, schema: PurchaseSchema },
      { name: HistoryDocument.name, schema: HistorySchema },
    ]),
    ProductModule,
    SharedModule,
  ],
  controllers: [PurchaseController],
  providers: [
    PurchaseService,
    {
      provide: 'IPurchaseRepository',
      useClass: PurchaseRepository,
    },
    HistoryService,
    CreatePurchaseHandler,
    GetUserPurchasesHandler,
    GetAllPurchasesHandler,
    DefaultUserService,
  ],
})
export class PurchaseModule {}
