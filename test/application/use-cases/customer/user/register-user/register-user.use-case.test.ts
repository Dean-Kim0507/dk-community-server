
import "reflect-metadata";
import { stub, reveal } from "jest-auto-stub";

import { RegisterUserUseCaseAdapter } from "../../../../../../src/application/use-cases/customer/user/register-user/register-user.use-case.adapter";
import { RegisterUserProviderPort, RegisterUserResult } from "../../../../../../src/domain/provider/register-user/register-user.port";
import { User } from "../../../../../../src/domain/entities/user/user";
import { ErrorMessages } from "../../../../../../src/shared/messages/error-messages";
import { UserFactory } from "../../../../../factories/user.factory";
import { RegisterUserUseCasePort } from "../../../../../../src/application/use-cases/customer/user/register-user/register-user.use-case.port";

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCasePort;

  const validUser: User = UserFactory();
  const registerUserProvider = stub<RegisterUserProviderPort>();

  beforeEach(() => {
    useCase = new RegisterUserUseCaseAdapter(registerUserProvider);
    jest.resetAllMocks();
  });

  it('should return success true and user when registration is successful', async () => {
    const registerResult: RegisterUserResult = { user: validUser, errors: {} };
    reveal(registerUserProvider).register.mockResolvedValueOnce(registerResult);

    const input = {
      email: validUser.email,
      username: validUser.username,
      password: validUser.password,
    };

    const result = await useCase.execute(input);

    expect(registerUserProvider.register).toHaveBeenCalledWith(expect.objectContaining(input));
    expect(result).toEqual({
      success: true,
      user: validUser,
    });
  });

  it('should return success false and errors when registration fails due to validation errors', async () => {
    const errors = {
      email: ErrorMessages.validation.emailRequired
    };
    const registerResult: RegisterUserResult = { errors };
    reveal(registerUserProvider).register.mockResolvedValueOnce(registerResult);

    const input = {
      email: "",
      username: validUser.username,
      password: validUser.password,
    };

    const result = await useCase.execute(input);

    expect(registerUserProvider.register).toHaveBeenCalledWith(expect.objectContaining(input));
    expect(result).toEqual({
      success: false,
      errors,
    });
  });

  it('should return success false and errors when registration fails due to duplicated user', async () => {
    const errors = {
      duplicatedUser: ErrorMessages.auth.duplicatedUser
    };
    const registerResult: RegisterUserResult = { errors };
    reveal(registerUserProvider).register.mockResolvedValueOnce(registerResult);

    const input = {
      email: validUser.email,
      username: validUser.username,
      password: validUser.password,
    };

    const result = await useCase.execute(input);

    expect(registerUserProvider.register).toHaveBeenCalledWith(expect.objectContaining(input));
    expect(result).toEqual({
      success: false,
      errors,
    });
  });

  it('should forward only the expected user fields to the provider', async () => {
    const registerResult: RegisterUserResult = { user: validUser, errors: {} };
    reveal(registerUserProvider).register.mockResolvedValueOnce(registerResult);

    const input = {
      email: "x@y.com",
      username: "userX",
      password: "passX",

      somethingExtra: "shouldNotBeUsed"
    } as any;

    await useCase.execute(input);

    expect(registerUserProvider.register).toHaveBeenCalledWith({
      email: "x@y.com",
      username: "userX",
      password: "passX"
    });
    expect(registerUserProvider.register).not.toHaveBeenCalledWith({somethingExtra: input.somethingExtra});
  });

  it('should handle provider returning undefined user with empty errors', async () => {
    reveal(registerUserProvider).register.mockResolvedValueOnce({ errors: {} });

    const input = {
      email: validUser.email,
      username: validUser.username,
      password: validUser.password,
    };

    const result = await useCase.execute(input);

    expect(result.success).toBe(true);
    expect(result.user).toBeUndefined();
    expect(result.errors).toBeUndefined();
  });
});
