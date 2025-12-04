import { injectable } from "tsyringe";
import { UserRepositoryPort } from "../../../domain/repositories/user.repository.port";
import { User as DomainUser } from "../../../domain/entities/user/user";
import { User as InfrastructureUser } from "../../typeorm/entities/user.entity";

const mapToDomain = (user: InfrastructureUser | null): DomainUser | null => {
    if (!user) return null;
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

@injectable()
class UserRepositoryAdapter implements UserRepositoryPort {
    async create(user: DomainUser): Promise<DomainUser> {
        const userEntity = new InfrastructureUser();
        userEntity.email = user.email;
        userEntity.username = user.username;
        userEntity.password = user.password;
        await userEntity.save();
        return mapToDomain(userEntity);
    }

    async findByEmail(email: string): Promise<DomainUser | null> {
        const user = await InfrastructureUser.findOneBy({ email });
        return mapToDomain(user);
    }

    async findByUsername(username: string): Promise<DomainUser | null> {
        const user = await InfrastructureUser.findOneBy({ username });
        return mapToDomain(user);
    }
}

export { UserRepositoryAdapter };