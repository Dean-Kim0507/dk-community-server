import { DependencyRegistry } from '../dependency-registry';
import { REGISTER_USER_USE_CASE } from './tokens';
import { RegisterUserUseCasePort } from '../../application/use-cases/customer/user/register-user/register-user.use-case.port';
import { RegisterUserProviderAdapter } from '../../domain/provider/register-user/register-user.adapter';

function registerUseCases(this: DependencyRegistry): void {

  this.register<RegisterUserUseCasePort>(REGISTER_USER_USE_CASE, {
    useClass: RegisterUserProviderAdapter,
  });
}

export { registerUseCases };
