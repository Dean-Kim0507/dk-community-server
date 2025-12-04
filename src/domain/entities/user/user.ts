import { BaseEntity } from "../base-entity/base-entity";
import { Comment } from "../comment/comment";
import { Post } from "../post/post";
import { Vote } from "../vote/vote";

export interface User extends BaseEntity {
    email: string;
    username: string;
    password: string;

    posts?: Post[];
    comments?: Comment[];
    votes?: Vote[];

    token?: string;
    }
    