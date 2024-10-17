import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'histories',
})
export class HistoryDocument extends Document {
  @Prop({ required: true })
  entityType: string;

  @Prop({ required: true })
  entityId: string;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  timestamp: Date;
}

export const HistorySchema = SchemaFactory.createForClass(HistoryDocument);
