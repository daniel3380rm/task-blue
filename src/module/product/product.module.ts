import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './presentation/product.controller';
import { ProductService } from './application/product.service';
import { ProductRepository } from './infrastructure/product.repository';
import {
  ProductDocument,
  ProductSchema,
} from './infrastructure/product.schema';
import { HistoryService } from '../../shared/history/history.service';
import {
  HistoryDocument,
  HistorySchema,
} from '../../shared/history/history.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductDocument.name, schema: ProductSchema },
      { name: HistoryDocument.name, schema: HistorySchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    HistoryService,
  ],
  exports: [ProductService],
})
export class ProductModule {}
