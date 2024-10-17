import { ApiProperty } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';

export class CreateProductDto {
  @ApiProperty({
    example: 'Smartphone',
    description: 'The name of the product',
  })
  name: string;

  @ApiProperty({
    example: 'A high-end smartphone',
    description: 'The description of the product',
  })
  description: string;

  @ApiProperty({ example: 999.99, description: 'The price of the product' })
  price: number;

  @ApiProperty({
    example: 100,
    description: 'The stock quantity of the product',
  })
  stock: number;
}
