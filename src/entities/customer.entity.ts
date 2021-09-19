import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import OrderEntity from "./order.entity";

@Entity('customer')
export default class CustomerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    first_name: string;

    @Column('text')
    last_name: string;

    @Column('text')
    email: string;

    @Column('text')
    phone: string;

    @Column('text')
    address: string;

    @Column('text')
    city: string;

    @Column('text')
    country: string;

    @Column('text')
    code_postal: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(type => OrderEntity, order => order.customer,{
        cascade: true,
    })
    orders: OrderEntity[];

}

