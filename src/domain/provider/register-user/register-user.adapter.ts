import { injectable, inject } from "tsyringe";
import { RegisterUserProviderPort, RegisterUserResult } from "./register-user.port";
import { UserRepositoryPort } from "../../repositories/user.repository.port";
import { User } from "../../entities/user/user";
import { USER_REPOSITORY_TOKEN } from "../../../configuration/dependency-registries/tokens";
import { validateUser } from "./validations/user.validator";
import { ErrorMessages } from "../../../shared/messages/error-messages";

@injectable()
export class RegisterUserProviderAdapter implements RegisterUserProviderPort {
    constructor(
        @inject(USER_REPOSITORY_TOKEN) 
        private readonly userRepository: UserRepositoryPort
    ) {}

    public async register(user: User): Promise<RegisterUserResult> {
        const isDuplicated = await this.duplicationCheck(user);
    
        if (isDuplicated) {
            return {
                errors: {
                    duplicatedUser: ErrorMessages.auth.duplicatedUser
                }
            };
        }

        const validationErrors = await validateUser(user)

        if (Object.keys(validationErrors).length > 0) {
            return {
                errors: validationErrors
            };
        }

        const createdUser = await this.userRepository.create( user );

        return {
            user: createdUser,
            errors: {}
        };

    }

    private async duplicationCheck(user: User): Promise<boolean> {
        const { email, username } = user;
        const emailUser = await this.userRepository.findByEmail(email);
        const usernameUser = await this.userRepository.findByUsername(username);

        return !!emailUser || !!usernameUser;
    }
}