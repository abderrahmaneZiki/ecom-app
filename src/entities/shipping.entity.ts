import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import OrderEntity from './order.entity';

@Entity('shipping')
export default class ShippingEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'text',
    })
    city: string;

    @Column('text')
    price: number;

    @OneToOne(type => OrderEntity, order => order.shipping)
    order: OrderEntity;

    @CreateDateColumn()
    createdAt: Date;

}
