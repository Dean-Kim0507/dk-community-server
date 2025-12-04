import { BaseEntity } from "../base-entity/base-entity";
import { Comment } from "../comment/comment";
import { Post } from "../post/post";
import { User } from "../user/user";

export interface Vote extends BaseEntity {
  value: number;
  username: string;
  user?: User;
  post?: Post;
  comment?: Comment;
}
