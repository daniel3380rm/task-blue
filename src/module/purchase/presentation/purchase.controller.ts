import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreatePurchaseCommand } from '../application/commands/create-purchase.command';
import { GetUserPurchasesQuery } from '../application/queries/get-user-purchases.query';
import { GetAllPurchasesQuery } from '../application/queries/get-all-purchases.query';
import { GetPurchaseDetailsQuery } from '../application/queries/get-purchase-details.query';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseResponseDto } from './dto/purchase-response.dto';
import { ObjectIdPipe } from '../../../shared/pipes/object-id.pipe';

@ApiTags('purchases')
@Controller('purchases')
export class PurchaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new purchase' })
  @ApiBody({ type: CreatePurchaseDto })
  @ApiResponse({
    status: 201,
    description: 'The purchase has been successfully created.',
    type: PurchaseResponseDto,
  })
  async createPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.commandBus.execute(
      new CreatePurchaseCommand(
        createPurchaseDto.userId,
        createPurchaseDto.productId,
        createPurchaseDto.quantity,
      ),
    );
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all purchases for a user' })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns all purchases for the user.',
    type: [PurchaseResponseDto],
  })
  async getUserPurchases(@Param('userId', ObjectIdPipe) userId: string) {
    return this.queryBus.execute(new GetUserPurchasesQuery(userId));
  }

  @Get()
  @ApiOperation({ summary: 'Get all purchases' })
  @ApiResponse({
    status: 200,
    description: 'Returns all purchases.',
    type: [PurchaseResponseDto],
  })
  async getAllPurchases() {
    return this.queryBus.execute(new GetAllPurchasesQuery());
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get purchase details' })
  // @ApiParam({ name: 'id', type: 'string' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns the purchase details.',
  //   type: PurchaseResponseDto,
  // })
  // @ApiResponse({ status: 404, description: 'Purchase not found.' })
  // async getPurchaseDetails(@Param('id', ObjectIdPipe) id: string) {
  //   return this.queryBus.execute(new GetPurchaseDetailsQuery(id));
  // }
}
