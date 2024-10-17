import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../domain/product.entity';
import { IProductRepository } from '../domain/product.repository.interface';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel(ProductDocument.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    const savedProduct = await createdProduct.save();
    return this.mapToEntity(savedProduct);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.productModel.findById(id).exec();
    return product ? this.mapToEntity(product) : null;
  }

  async update(product: Product): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(product.id, product, { new: true })
      .exec();
    return this.mapToEntity(updatedProduct);
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }

  private mapToEntity(document: ProductDocument): Product {
    return new Product(
      document._id.toString(),
      document.name,
      document.description,
      document.price,
      document.stock,
    );
  }
}
