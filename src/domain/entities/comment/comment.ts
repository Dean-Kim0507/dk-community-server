import { BaseEntity } from "../base-entity/base-entity";
import { Post } from "../post/post";
import { User } from "../user/user";
import { Vote } from "../vote/vote";

export interface Comment extends BaseEntity{
  identifier: string;
  body: string;
  username: string;
  postId: number;
  user?: User;
  post?: Post;
  votes?: Vote[];
  voteScore?: number;
  userVote?: number;
}
  