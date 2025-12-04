import { injectable, inject } from "tsyringe";
import { RegisterUserProviderPort, RegisterUserResult } from "../../../../../domain/provider/register-user/register-user.port";
import { User } from "../../../../../domain/entities/user/user";
import { ExecuteInput, ExecuteResult, RegisterUserUseCasePort } from "./register-user.use-case.port";

@injectable()
class RegisterUserUseCaseAdapter implements RegisterUserUseCasePort {
    constructor(
        @inject("RegisterUserProviderPort")
        private readonly registerUserProvider: RegisterUserProviderPort
    ) {}

    public async execute(input: ExecuteInput): Promise<ExecuteResult> {
        const user = {
            email: input.email,
            username: input.username,
            password: input.password,
        } as User;

        const result: RegisterUserResult = await this.registerUserProvider.register(user);

        if (result.errors && Object.keys(result.errors).length > 0) {
            return { success: false, errors: result.errors };
        }

        return { success: true, user: result.user };
    }
}

export {RegisterUserUseCaseAdapter}

