import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty({
    description: 'The ID of the user making the purchase',
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ description: 'The ID of the product being purchased' })
  @IsString()
  productId: string;

  @ApiProperty({ description: 'The quantity of the product being purchased' })
  @IsNumber()
  @Min(1)
  quantity: number;
}
