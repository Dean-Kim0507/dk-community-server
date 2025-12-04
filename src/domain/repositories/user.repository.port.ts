import { User } from "../entities/user/user";

export interface UserRepositoryPort {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
  }