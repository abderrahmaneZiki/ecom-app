import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
@Entity('user')
export default class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    username: string;

    @Column('text')
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    }

    userResponse() {
        return {
            id: this.id,
            username: this.username,
            token: this.getToken()
        }
    }

    private getToken() {
        const { id, username } = this;
        try {
            jwt.sign({
                id,
                username
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                })
        } catch (err) {
            return null;
        }
    }
}
