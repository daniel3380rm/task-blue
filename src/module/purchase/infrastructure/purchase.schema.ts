import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  collection: 'purchases',
})
export class PurchaseDocument extends Document {
  // @Prop({ required: true })
  // id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  purchaseDate: Date;
}

export const PurchaseSchema = SchemaFactory.createForClass(PurchaseDocument);
