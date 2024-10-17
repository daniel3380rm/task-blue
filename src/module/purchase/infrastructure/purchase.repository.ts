import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from '../domain/purchase.entity';
import { IPurchaseRepository } from '../domain/purchase.repository.interface';
import { PurchaseDocument } from './purchase.schema';

@Injectable()
export class PurchaseRepository implements IPurchaseRepository {
  constructor(
    @InjectModel(PurchaseDocument.name)
    private purchaseModel: Model<PurchaseDocument>,
  ) {}

  async create(purchase: Purchase): Promise<Purchase> {
    const createdPurchase = new this.purchaseModel(purchase);
    return createdPurchase.save();
  }

  async findByUserId(userId: string): Promise<Purchase[]> {
    return this.purchaseModel.find({ userId }).exec();
  }

  async findAll(): Promise<Purchase[]> {
    return this.purchaseModel.find().exec();
  }

  async findById(id: string): Promise<Purchase | null> {
    return this.purchaseModel.findById(id).exec();
  }
}
