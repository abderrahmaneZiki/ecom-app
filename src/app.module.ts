import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { ReviewModule } from './modules/review/review.module';
import { OrderModule } from './modules/order/order.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { CartModule } from './modules/cart/cart.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ReplyModule } from './modules/reply/reply.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkSpaceModule } from './modules/work-space/work-space.module';
import { ClientSpaceModule } from './modules/client-space/client-space.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule,
    ProductModule,
    CategoryModule,
    ReviewModule,
    OrderModule,
    ShippingModule,
    CartModule,
    CustomerModule,
    ReplyModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.PROT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
    }),

    WorkSpaceModule,
    ClientSpaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
