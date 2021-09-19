import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ReviewEntity from './review.entity';

@Entity('reply')
export default class ReplyEntity {
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


    @ManyToOne(type => ReviewEntity, review => review.reply,{ onDelete: 'CASCADE' })
    review: ReviewEntity

    @CreateDateColumn()
    createdAt: Date;

}