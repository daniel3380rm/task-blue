import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Product } from '../domain/product.entity';
import { IProductRepository } from '../domain/product.repository.interface';
import { CreateProductCommand } from './commands/create-product.command';
import { DeleteProductCommand } from './commands/delete-product.command';
import { GetProductQuery } from './queries/get-product.query';
import { HistoryService } from '../../../shared/history/history.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    private readonly historyService: HistoryService,
  ) {}

  async createProduct(command: CreateProductCommand): Promise<Product> {
    const product = new Product(
      null,
      command.name,
      command.description,
      command.price,
      command.stock,
    );
    const createdProduct = await this.productRepository.create(product);
    await this.historyService.recordHistory(
      'Product',
      createdProduct.id,
      'CREATE',
    );
    return createdProduct;
  }

  async getProduct(query: GetProductQuery): Promise<Product> {
    const product = await this.productRepository.findById(query.id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${query.id} not found`);
    }
    return product;
  }

  // async purchaseProduct(command: PurchaseProductCommand): Promise<Product> {
  //   const product = await this.productRepository.findById(command.id);
  //   if (!product) {
  //     throw new NotFoundException(`Product with ID ${command.id} not found`);
  //   }
  //   if (product.stock < command.quantity) {
  //     throw new Error('Insufficient stock');
  //   }
  //   product.stock -= command.quantity;
  //   const updatedProduct = await this.productRepository.update(product);
  //   await this.historyService.recordHistory(
  //     'Product',
  //     updatedProduct.id,
  //     'PURCHASE',
  //   );
  //   return updatedProduct;
  // }

  async deleteProduct(command: DeleteProductCommand): Promise<void> {
    await this.productRepository.delete(command.id);
    await this.historyService.recordHistory('Product', command.id, 'DELETE');
  }

  async updateProductStock(
    productId: string,
    newStock: number,
  ): Promise<Product> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    product.stock = newStock;
    const updatedProduct = await this.productRepository.update(product);
    await this.historyService.recordHistory(
      'Product',
      updatedProduct.id,
      'UPDATE_STOCK',
    );
    return updatedProduct;
  }
}
