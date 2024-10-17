import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class DefaultUserService implements OnModuleInit {
  private defaultUserId: string;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    await this.ensureDefaultUser();
    console.log('Default User ID:', this.defaultUserId);
  }

  private async ensureDefaultUser() {
    const defaultUser = await this.userModel.findOne({
      email: 'default@example.com',
    });

    if (defaultUser) {
      this.defaultUserId = defaultUser._id.toString();
    } else {
      const newUser = new this.userModel({
        name: 'Default User',
        email: 'default@example.com',
      });
      const savedUser = await newUser.save();
      this.defaultUserId = savedUser._id.toString();
    }
  }

  getDefaultUserId(): string {
    if (!this.defaultUserId) {
      throw new Error('Default user ID not initialized');
    }
    return this.defaultUserId;
  }
}
