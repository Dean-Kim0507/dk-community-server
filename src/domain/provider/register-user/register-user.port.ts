import { User } from "../../entities/user/user";

export interface RegisterUserResult {
    user?: User;
    errors?: Record<string, string>;
}

export interface RegisterUserProviderPort {
    register(user: User): Promise<RegisterUserResult>;
}