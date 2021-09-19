import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import CartEntity from './cart.entity';
import CategoryEntity from './category.entity';
import OrderEntity from './order.entity';
import PanelEntity from './panel.entity';
import ReviewEntity from './review.entity';

@Entity('product')
export default class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    short_name: string;

    @Column('text')
    long_name: string;

    @Column('text')
    description: string;

    @Column('simple-array')
    img: string[];

    @Column('text')
    variation: string;

    @Column('text')
    price: number;

    @ManyToOne(type => CategoryEntity, category => category.products)
    category: CategoryEntity;

    @OneToMany(type => ReviewEntity, reviews => reviews.product,{
        onDelete: 'CASCADE',
    })
    reviews: ReviewEntity[];

    @OneToMany(type => PanelEntity, panel => panel.product,{
        onDelete: 'CASCADE',
    })
    panel: PanelEntity[];

    @CreateDateColumn()
    createdAt: Date;

}

