import { BaseEntity } from "../base-entity/base-entity";
import { Comment } from "../comment/comment";
import { Sub } from "../sub/sub";
import { User } from "../user/user";
import { Vote } from "../vote/vote";

export interface Post extends BaseEntity {
  identifier: string;
  title: string;
  slug: string;
  body: string;
  subName: string;
  username: string;

  user?: User;
  sub?: Sub; 
  comments?: Comment[];
  votes?: Vote[];

  url?: string;
  commentCount?: number;
  voteScore?: number;
  userVote?: number;
}
