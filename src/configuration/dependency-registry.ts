import { container, InjectionToken } from 'tsyringe';

import { registerRepositories } from './dependency-registries/repositories';
import { registerProviders } from './dependency-registries/providers';
import { registerUseCases } from './dependency-registries/use-case';

class DependencyRegistry {
  public container = container;

  constructor() {
    // Register repositories first (they are dependencies of providers)
    registerRepositories.call(this);
    registerUseCases.call(this);
    registerProviders.call(this);
  }

  resolve<T>(token: InjectionToken<T>): T {
    return this.container.resolve(token);
  }

  register<T>(token: InjectionToken<T>, provider: any): void {
    this.container.register<T>(token, provider);
  }

  registerInstance<T>(token: InjectionToken<T>, instance: T): void {
    this.container.registerInstance(token, instance);
  }

  clearInstances(): void {
    this.container.clearInstances();
  }
}

let dependencyRegistry: DependencyRegistry;

const getDependencyRegistryInstance = (): DependencyRegistry => {
  if (!dependencyRegistry) {
    dependencyRegistry = new DependencyRegistry();
  }

  return dependencyRegistry;
};

export { getDependencyRegistryInstance, DependencyRegistry };
