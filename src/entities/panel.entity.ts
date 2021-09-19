import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import CartEntity from './cart.entity';
import ProductEntity from './product.entity';

@Entity('panel')
export default class PanelEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    quantity: number;

    @Column('text')
    price: number;

    @ManyToOne(type => ProductEntity, product => product.panel,{ onDelete: 'CASCADE' })
    product: ProductEntity;

    @ManyToOne(type => CartEntity, cart =>cart.panel)
    cart: CartEntity;

    
    @CreateDateColumn()
    createdAt: Date;

}

