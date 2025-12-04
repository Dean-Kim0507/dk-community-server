import { BaseEntity } from "../base-entity/base-entity";
import { Comment } from "../comment/comment";
import { Post } from "../post/post";
import { User } from "../user/user";

export interface Sub extends BaseEntity {
  name: string;
  title: string;
  description: string;

  posts?: Post[];
  comments?: Comment[];

  imageUrn?: string;
  bannerUrn?: string;
  imageUrl?: string;
  bannerUrl?: string;

  username: string;
  user?: User;

  postCount?: number;
}
