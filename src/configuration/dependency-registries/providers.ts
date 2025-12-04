import { DependencyRegistry } from '../dependency-registry';
import { RegisterUserProviderPort } from '../../domain/provider/register-user/register-user.port';
import { RegisterUserProviderAdapter } from '../../domain/provider/register-user/register-user.adapter';
import { REGISTER_USER_PROVIDER_TOKEN } from './tokens';

function registerProviders(this: DependencyRegistry): void {
  this.register<RegisterUserProviderPort>(REGISTER_USER_PROVIDER_TOKEN, {
    useClass: RegisterUserProviderAdapter,
  });
}

export { registerProviders };
