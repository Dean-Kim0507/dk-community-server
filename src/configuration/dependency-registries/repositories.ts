import { DependencyRegistry } from '../dependency-registry';
import { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { UserRepositoryAdapter } from '../../infrastructure/repositories/user/user.repository.adapter';
import { USER_REPOSITORY_TOKEN } from './tokens';

function registerRepositories(this: DependencyRegistry): void {
  this.register<UserRepositoryPort>(USER_REPOSITORY_TOKEN, {
    useClass: UserRepositoryAdapter,
  });
}

export { registerRepositories };

