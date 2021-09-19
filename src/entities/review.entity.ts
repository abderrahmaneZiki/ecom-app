import { isNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ProductEntity from './product.entity';
import ReplyEntity from './reply.entity';

@Entity('review')
export default class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'text',
    })
    name: string;

    @Column('text')
    email: string;

    @Column('text')
    message: string;
    
    
    @ManyToOne(type => ProductEntity, product => product.reviews,{ onDelete: 'CASCADE' })
    product: ProductEntity
    
    @OneToMany(type => ReplyEntity, reply => reply.review,{
        cascade: true,
    })
    reply: ReplyEntity[]

    @CreateDateColumn()
    createdAt: Date;

}
