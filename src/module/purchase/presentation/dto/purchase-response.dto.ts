import { ApiProperty } from '@nestjs/swagger';

export class PurchaseResponseDto {
  @ApiProperty({ description: 'The ID of the purchase' })
  id: string;

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

  @ApiProperty({ description: 'The details of the product', required: false })
  product?: {
    name: string;
    description: string;
    price: number;
  };
}