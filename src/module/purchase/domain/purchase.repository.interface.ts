import { Purchase } from './purchase.entity';

export interface IPurchaseRepository {
  create(purchase: Purchase): Promise<Purchase>;
  findByUserId(userId: string): Promise<Purchase[]>;
  findAll(): Promise<Purchase[]>;
  findById(id: string): Promise<Purchase | null>;
}
