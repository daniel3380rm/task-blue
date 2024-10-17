import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductService } from '../application/product.service';
import { CreateProductDto } from '../dto/product.dto';
import { CreateProductCommand } from '../application/commands/create-product.command';
import { DeleteProductCommand } from '../application/commands/delete-product.command';
import { GetProductQuery } from '../application/queries/get-product.query';
import { ObjectIdPipe } from '../../../shared/pipes/object-id.pipe';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const command = new CreateProductCommand(
      createProductDto.name,
      createProductDto.description,
      createProductDto.price,
      createProductDto.stock,
    );
    return this.productService.createProduct(command);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiParam({ name: 'id', description: 'The id of the product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async getProduct(@Param('id', ObjectIdPipe) id: string) {
    return this.productService.getProduct(new GetProductQuery(id));
  }

  // @Post(':id/purchase')
  // @HttpCode(200)
  // @ApiOperation({ summary: 'Purchase a product' })
  // @ApiParam({ name: 'id', description: 'The id of the product to purchase' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The product has been successfully purchased.',
  // })
  // @ApiResponse({ status: 404, description: 'Product not found.' })
  // async purchaseProduct(
  //   @Param('id') id: string,
  //   @Body() purchaseProductDto: PurchaseProductDto,
  // ) {
  //   return this.productService.purchaseProduct(
  //     new PurchaseProductCommand(id, purchaseProductDto.quantity),
  //   );
  // }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', description: 'The id of the product to delete' })
  @ApiResponse({
    status: 204,
    description: 'The product has been successfully deleted.',
  })
  async deleteProduct(@Param('id', ObjectIdPipe) id: string) {
    await this.productService.deleteProduct(new DeleteProductCommand(id));
  }
}
