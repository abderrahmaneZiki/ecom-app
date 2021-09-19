import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CustomerDto from 'src/dto/customer.dto';
import ReplyDto from 'src/dto/reply.dto';
import ReviewDto from 'src/dto/review.dto';
import CartEntity from 'src/entities/cart.entity';
import CustomerEntity from 'src/entities/customer.entity';
import OrderEntity from 'src/entities/order.entity';
import PanelEntity from 'src/entities/panel.entity';
import ProductEntity from 'src/entities/product.entity';
import ReplyEntity from 'src/entities/reply.entity';
import ReviewEntity from 'src/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientSpaceService {
    constructor(@InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>,
        @InjectRepository(ReplyEntity) private readonly replyRepository: Repository<ReplyEntity>,
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>,
        @InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>,
        @InjectRepository(PanelEntity) private readonly panelRepository: Repository<PanelEntity>) { }

    async listProduct() {
        return await this.productRepository.find({
            relations: ['category', 'reviews', 'reviews.reply']
        })
    }
   async productById(id){
       return  await this.productRepository.findOne({
        where:{id:id},
        relations: ['category', 'reviews', 'reviews.reply']
    })
   }
    async addReview(data) {
        try {
            const review = await this.reviewRepository.create(data);
            if (review) {
                return await this.reviewRepository.save(review);
            }
            else {
                throw new HttpException('ERROR', HttpStatus.BAD_REQUEST);
            }
        } catch (e) {
            throw new HttpException('ERROR Product not found', HttpStatus.NOT_FOUND);
        }
    }

    async addReply(data) {
        try {
            const reply = await this.replyRepository.create(data);
            if (reply) {
                return await this.replyRepository.save(reply);
            }
            else {
                throw new HttpException('ERROR', HttpStatus.BAD_REQUEST);
            }
        } catch (e) {
            throw new HttpException('ERROR review not found', HttpStatus.NOT_FOUND);
        }

    }

    async createCustomer(data) {
        const customer = await this.customerRepository.create(data);
        if (customer) {
            await this.customerRepository.save(customer);
            return customer;
        }
        throw new HttpException("create customer faild,order doesn't created", HttpStatus.BAD_REQUEST);
    }

    async createCart(data) {
        const cart = await this.cartRepository.create(data);
        if (cart) {
            await this.cartRepository.save(cart);
            data.products.map(async (item) => {
                let panel: any = {
                    product: item.product,
                    cart: cart,
                    quantity: item.quantity,
                    price: item.price
                }
                let drapo = await this.panelRepository.create(panel)
                await this.panelRepository.save(drapo)
            })
            return cart;
        }
        throw new HttpException("ERROR", HttpStatus.BAD_REQUEST);
    }
    async addProductToCart(data, id) {
        const cart = await this.cartRepository.findOne({ where: { id } });
        if (cart) {
            let panel: any = {
                product: data.product,
                cart: cart,
                quantity: data.quantity,
                price: data.price
            }
            let item = await this.panelRepository.create(panel)
            await this.panelRepository.save(item);
            return await this.getCart(id);
        }
        throw new HttpException("ERROR", HttpStatus.BAD_REQUEST);
    }
    async removeProductFromCart(id) {
        let panel = await this.panelRepository.findOne({ where: { id }, relations: ['cart'] });
        if (panel) {
            let item = await this.panelRepository.remove(panel)
            await this.panelRepository.save(item);
            return await this.getCart(panel.cart.id);
        }
        throw new HttpException("ERROR", HttpStatus.BAD_REQUEST);
    }

    async updateQuantity(id, data) {
        const cart = await this.cartRepository.findOne({ where: { id } });
        if (cart) {
            const panel = await this.panelRepository.findOne({ where: { id: data.id } });
            if (panel) {
                panel.quantity = data.quantity;
                panel.price = data.price;
                await this.panelRepository.update(data.id, panel);
                return await this.getCart(id);
            }
        }
        throw new HttpException("ERROR", HttpStatus.BAD_REQUEST);
    }
    async getCart(cartId) {
        return await this.cartRepository.findOne({ where: { id: cartId }, relations: ['panel', 'panel.product'] });
    }

    async addOrder(data) {
        const { shiped_to, total, order_status, customer } = data;
        let order: any = {
            shiped_to: shiped_to,
            total: total,
            order_status: order_status,
            customer: customer
        };
        const cart = await this.cartRepository.findOne({ where: { id: data.cart.id } });
        if (cart) {
            order.cart = cart;
            await this.orderRepository.save(order);
            cart.status = "isOrder";
            this.cartRepository.update(cart.id, cart)
            throw new HttpException('SUCCESS', HttpStatus.CREATED);
        }

        throw new HttpException('ERROR Cart', HttpStatus.BAD_REQUEST);
    }


}
