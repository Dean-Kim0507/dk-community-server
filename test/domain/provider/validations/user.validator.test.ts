import "reflect-metadata";
import { validateUser } from "../../../../src/domain/provider/register-user/validations/user.validator";
import { User } from "../../../../src/domain/entities/user/user";
import { ErrorMessages } from "../../../../src/shared/messages/error-messages";
import { UserFactory } from "../../../factories/user.factory";

jest.mock("class-validator", () => {
  const original = jest.requireActual("class-validator");
  return {
    ...original,
    validate: jest.fn()
  }
});

const mockValidate = require("class-validator").validate;

describe("validateUser", () => {
  const validUser: User = UserFactory();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty object for a valid user", async () => {
    mockValidate.mockResolvedValueOnce([]);
    const errors = await validateUser(validUser);
    expect(errors).toEqual({});
  });

  it("should return an error for empty email", async () => {
    const user = { ...validUser, email: "" };
    mockValidate.mockResolvedValueOnce([
      {
        property: "email",
        constraints: { isNotEmpty: ErrorMessages.validation.emailRequired }
      }
    ]);
    const errors = await validateUser(user);
    expect(errors).toEqual({
      email: ErrorMessages.validation.emailRequired
    });
  });

  it("should return an error for invalid email format", async () => {
    const user = { ...validUser, email: "invalid_email" };
    mockValidate.mockResolvedValueOnce([
      {
        property: "email",
        constraints: { isEmail: ErrorMessages.validation.emailInvalid }
      }
    ]);
    const errors = await validateUser(user);
    expect(errors).toEqual({
      email: ErrorMessages.validation.emailInvalid
    });
  });

  it("should return multiple errors for multiple invalid fields", async () => {
    const user = { ...validUser, email: "", password: "" };
    mockValidate.mockResolvedValueOnce([
      {
        property: "email",
        constraints: { isNotEmpty: ErrorMessages.validation.emailRequired }
      },
      {
        property: "password",
        constraints: { isNotEmpty: ErrorMessages.auth.passwordRequired, minLength: ErrorMessages.validation.passwordMinLength }
      }
    ]);
    const errors = await validateUser(user);
    expect(errors).toEqual({
      email: ErrorMessages.validation.emailRequired,
      password: ErrorMessages.auth.passwordRequired + ", " + ErrorMessages.validation.passwordMinLength
    });
  });

  it("should concatenate multiple constraints for one field", async () => {
    const user = { ...validUser, username: "" };
    mockValidate.mockResolvedValueOnce([
      {
        property: "username",
        constraints: {
          isNotEmpty: ErrorMessages.auth.usernameRequired,
          minLength: ErrorMessages.validation.usernameMinLength
        }
      }
    ]);
    const errors = await validateUser(user);
    expect(errors).toEqual({
      username: ErrorMessages.auth.usernameRequired + ", " + ErrorMessages.validation.usernameMinLength
    });
  });
});

