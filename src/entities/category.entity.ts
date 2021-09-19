import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ProductEntity from './product.entity';

@Entity('category')
export default class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(type => ProductEntity, product => product.category,{
        cascade: true,
    })
    products: ProductEntity[];

}

