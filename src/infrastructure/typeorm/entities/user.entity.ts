import { IsEmail, Length } from "class-validator";
import { Entity, Column, Index, In, OneToMany, BeforeInsert } from "typeorm"
import bcrypt from 'bcryptjs';
import Post from "./post.entity";
import Vote from "./vote.entity";
import BaseEntity from './base-entity.entity';
import { ValidationMessages } from "../../../shared/messages/validation-messages";

@Entity("users")
export class User extends BaseEntity {

    @Index()
    @IsEmail(undefined, { message: ValidationMessages.emailInvalid })
    @Length(1, 255, { message: ValidationMessages.emailRequired })
    @Column({ unique: true })
    email: string;

    @Index()
    @Length(3, 32, { message: ValidationMessages.usernameMinLength })
    @Column({ unique: true })
    username: string

    @Column()
    @Length(6, 255, { message: ValidationMessages.passwordMinLength })
    password: string;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Vote, (vote) => vote.user)
    votes: Vote[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }

}
