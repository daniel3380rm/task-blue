import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPurchaseRepository } from '../domain/purchase.repository.interface';
import { Purchase } from '../domain/purchase.entity';
import { CreatePurchaseCommand } from './commands/create-purchase.command';
import { ProductService } from '../../product/application/product.service';
import { DefaultUserService } from '../../../shared/services/default-user.service';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('IPurchaseRepository')
    private readonly purchaseRepository: IPurchaseRepository,
    private readonly productService: ProductService,
    private readonly defaultUserService: DefaultUserService,
  ) {}

  async createPurchase(command: CreatePurchaseCommand): Promise<Purchase> {
    const userId = this.defaultUserService.getDefaultUserId();

    const product = await this.productService.getProduct({
      id: command.productId,
    });

    if (product.stock < command.quantity) {
      throw new Error('Insufficient stock');
    }

    const totalPrice = product.price * command.quantity;
    const purchase = new Purchase(
      userId,
      product.id,
      command.quantity,
      totalPrice,
      new Date(),
    );

    const newStock = product.stock - command.quantity;
    await this.productService.updateProductStock(product.id, newStock);
    // await this.historyService.recordHistory(
    //     'Product',
    //     updatedProduct.id,
    //     'PURCHASE',
    //   );
    return this.purchaseRepository.create(purchase);
  }

  async getUserPurchases(userId: string): Promise<Purchase[]> {
    return this.purchaseRepository.findByUserId(userId);
  }

  async getAllPurchases(): Promise<Purchase[]> {
    return this.purchaseRepository.findAll();
  }

  async getPurchaseDetails(purchaseId: string): Promise<any> {
    const purchase = await this.purchaseRepository.findById(purchaseId);
    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${purchaseId} not found`);
    }

    const product = await this.productService.getProduct({
      id: purchase.productId,
    });

    return {
      ...purchase,
      product: {
        name: product.name,
        description: product.description,
        price: product.price,
      },
    };
  }
}
