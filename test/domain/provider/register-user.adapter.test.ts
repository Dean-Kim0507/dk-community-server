import "reflect-metadata";
import { reveal, stub } from 'jest-auto-stub';


import { RegisterUserProviderAdapter } from "../../../src/domain/provider/register-user/register-user.adapter";
import { User } from "../../../src/domain/entities/user/user";
import { UserRepositoryPort } from "../../../src/domain/repositories/user.repository.port";
import { ErrorMessages } from "../../../src/shared/messages/error-messages";
import { UserFactory } from "../../factories/user.factory";

describe("RegisterUserProviderAdapter", () => {
  const  userRepository = stub<UserRepositoryPort>();
  let provider: RegisterUserProviderAdapter;

  const validUser: User = UserFactory();

  beforeEach(() => {
    provider = new RegisterUserProviderAdapter(userRepository);
    jest.clearAllMocks();
  });

  it("should register a valid user and return the user object", async () => {
    reveal(userRepository).findByEmail.mockResolvedValue(null);
    reveal(userRepository).findByUsername.mockResolvedValue(null);
    reveal(userRepository).create.mockResolvedValue(validUser);

    const result = await provider.register({ ...validUser });

    expect(userRepository.findByEmail).toHaveBeenCalledWith(validUser.email);
    expect(userRepository.findByUsername).toHaveBeenCalledWith(validUser.username);
    expect(userRepository.create).toHaveBeenCalledWith(validUser);
    expect(result.errors).toEqual({});
    expect(result.user).toEqual(validUser);
  });

  it("should return errors if user with email or username already exists", async () => {
    reveal(userRepository).findByEmail.mockResolvedValue(validUser);
    reveal(userRepository).findByUsername.mockResolvedValue(null);

    const result = await provider.register({ ...validUser });
    expect(userRepository.create).not.toHaveBeenCalled();
    expect(result.errors).toEqual({
        duplicatedUser: ErrorMessages.auth.duplicatedUser
    });
    expect(result.user).toBeUndefined();
  });

  it("should return validation errors for invalid user", async () => {
    const invalidUser = { ...validUser, email: "" };

    jest.spyOn(require("class-validator"), "validate").mockImplementation(async (user: any) => {
      if (!user.email) {
        return [{
          property: "email",
          constraints: { isNotEmpty: ErrorMessages.validation.emailRequired }
        }];
      }
      return [];
    });


    reveal(userRepository).findByEmail.mockResolvedValue(null);
    reveal(userRepository).findByUsername.mockResolvedValue(null);

    const result = await provider.register(invalidUser);

    expect(result.errors).toEqual({
        email: ErrorMessages.validation.emailRequired 
    });
    expect(result.user).toBeUndefined();
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
