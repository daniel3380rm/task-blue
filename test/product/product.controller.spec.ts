import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../src/module/product/presentation/product.controller';
import { ProductService } from '../../src/module/product/application/product.service';
import { CreateProductCommand } from '../../src/module/product/application/commands/create-product.command';
import { Product } from '../../src/module/product/domain/product.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            createProduct: jest.fn(),
            getProduct: jest.fn(),
            purchaseProduct: jest.fn(),
            deleteProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductCommand = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 9.99,
        stock: 100,
      };
      const expectedProduct: Product = {
        id: '1',
        ...createProductDto,
      };

      jest
        .spyOn(productService, 'createProduct')
        .mockResolvedValue(expectedProduct);

      const result = await controller.createProduct(createProductDto);

      expect(result).toEqual(expectedProduct);
      expect(productService.createProduct).toHaveBeenCalledWith(
        createProductDto,
      );
    });
  });
});
