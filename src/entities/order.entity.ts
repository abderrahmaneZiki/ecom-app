import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import CartEntity from './cart.entity';
import CustomerEntity from './customer.entity';
import ProductEntity from './product.entity';
import ShippingEntity from './shipping.entity';

@Entity('order')
export default class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    shipped: string;

    @Column('text')
    quantity: number;

    @Column('text')
    shiped_to: string;

    @Column('text')
    order_status: string;

    @Column('text')
    total: string;

    @Column('text')
    price: number;

    @ManyToOne(type => CartEntity, cart => cart.order,{
        cascade: true,
    })
    cart: CartEntity;

    @ManyToOne(type => CustomerEntity, customer => customer.orders)
    customer: CustomerEntity;

    @OneToOne(type => ShippingEntity, shipping => shipping.order,{
        cascade: true,
    })
    shipping: ShippingEntity;

    @CreateDateColumn()
    ordered: Date;

}

