import { validate, ValidationError } from "class-validator";
import { User } from "../../../entities/user/user";
import { User as UserEntity } from "../../../../infrastructure/typeorm/entities/user.entity"; 

export async function validateUser(user: User): Promise<Record<string, string>> {
    const { email, username, password } = user;
    const userEntity = new UserEntity();
    
    userEntity.email = email;
    userEntity.username = username;
    userEntity.password = password;

    const errors: ValidationError[] = await validate(user);
    if (!errors.length) return {};

    const formatted: Record<string, string> = {};
    for (const error of errors) {
        if (error.constraints) {
            // Concatenate all constraint messages for this property
            formatted[error.property] = Object.values(error.constraints).join(", ");
        }
    }
    return formatted;
}
