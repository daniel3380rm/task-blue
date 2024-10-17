import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier of the product',
  })
  id: string;

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

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }
}
