import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import OrderEntity from './order.entity';
import PanelEntity from './panel.entity';
import ProductEntity from './product.entity';

@Entity('cart')
export default class CartEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type:"text",
        default:"isCart"
    })
    status: string;

    @OneToMany(type => PanelEntity, panel => panel.cart,{
        cascade: true,
    })
    panel: PanelEntity[];

    @OneToMany(type => OrderEntity, order => order.cart)
    order: OrderEntity;
   
    @CreateDateColumn()
    createdAt: Date;

}

