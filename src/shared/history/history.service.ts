import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryDocument } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(HistoryDocument.name)
    private historyModel: Model<HistoryDocument>,
  ) {}

  async recordHistory(
    entityType: string,
    entityId: string,
    action: string,
  ): Promise<void> {
    const history = new this.historyModel({
      entityType,
      entityId,
      action,
      timestamp: new Date(),
    });
    await history.save();
  }
}
