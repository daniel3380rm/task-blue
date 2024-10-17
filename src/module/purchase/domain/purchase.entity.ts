import { ApiProperty } from '@nestjs/swagger';

export class Purchase {
  // @ApiProperty({ description: 'The ID of the purchase' })
  // id: string;

  @ApiProperty({ description: 'The ID of the user who made the purchase' })
  userId: string;

  @ApiProperty({ description: 'The ID of the product purchased' })
  productId: string;

  @ApiProperty({ description: 'The quantity of the product purchased' })
  quantity: number;

  @ApiProperty({ description: 'The total price of the purchase' })
  totalPrice: number;

  @ApiProperty({ description: 'The date and time of the purchase' })
  purchaseDate: Date;

  constructor(
    // id: string,
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number,
    purchaseDate: Date,
  ) {
    // this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.purchaseDate = purchaseDate;
  }
}
