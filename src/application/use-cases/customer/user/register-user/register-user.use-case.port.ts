import { User } from "../../../../../domain/entities/user/user";

export interface ExecuteInput {
    email: string;
    username: string;
    password: string;
}

export interface ExecuteResult {
    success: boolean; 
    user?: User; 
    errors?: Record<string, string> 
}

export interface RegisterUserUseCasePort {
  execute(input: ExecuteInput): Promise<ExecuteResult>;
}
