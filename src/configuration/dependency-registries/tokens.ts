/**
 * Dependency Injection Tokens
 * 
 * Centralized tokens for dependency injection to avoid magic strings
 * and improve type safety.
 */

// Repository Tokens
export const USER_REPOSITORY_TOKEN = Symbol('UserRepositoryPort');

// Provider Tokens
export const REGISTER_USER_PROVIDER_TOKEN = Symbol('RegisterUserProviderPort');

// Use-case Tokens
export const REGISTER_USER_USE_CASE = Symbol('RegisterUserUseCase');