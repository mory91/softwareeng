import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthService } from '../auth/auth.service';
import { ProductController } from './product.controller';
import { Product } from '../entities/Product';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishToBuy } from 'entities/wishtobuy';
import { User } from 'entities/User';
import { Image } from 'entities/Image';
import { ImageService } from 'image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, WishToBuy, User, Image])],
  components: [ProductService, ImageService],
  controllers: [ProductController],
})
export class ProductModule {}