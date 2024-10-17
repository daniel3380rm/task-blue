import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './module/product/product.module';
import { PurchaseModule } from './module/purchase/purchase.module';
import databaseConfig from './config/database.config';
import { DefaultUserService } from './shared/services/default-user.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    ProductModule,
    PurchaseModule,
  ],
  providers: [DefaultUserService],
  exports: [DefaultUserService],
})
export class AppModule {}
