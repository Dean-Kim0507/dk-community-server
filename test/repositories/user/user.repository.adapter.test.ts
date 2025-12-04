import "reflect-metadata";
import {faker} from "@faker-js/faker";

import { UserRepositoryAdapter } from "../../../src/infrastructure/repositories/user/user.repository.adapter";
import { User as InfrastructureUser } from "../../../src/infrastructure/typeorm/entities/user.entity";
import { UserFactory } from "../../factories/user.factory";

describe("UserRepositoryAdapter", () => {
  let userRepositoryAdapter: UserRepositoryAdapter;

  const MockedUser = UserFactory();

  beforeEach(() => {
    userRepositoryAdapter = new UserRepositoryAdapter();
    jest.clearAllMocks();
  });

  describe("create", () => {
    const userInstance: any = new InfrastructureUser();

    afterAll(()=>{
        jest.restoreAllMocks();
    })

    it("should create and save a new user, returning the mapped domain user", async () => {
      const saveSpy = jest.spyOn(InfrastructureUser.prototype, "save").mockResolvedValue(undefined);

      userInstance.id = MockedUser.id;
      userInstance.email = MockedUser.email;
      userInstance.username = MockedUser.username;
      userInstance.password = MockedUser.password;
      userInstance.createdAt = MockedUser.createdAt;
      userInstance.updatedAt = MockedUser.updatedAt;

      const result = await userRepositoryAdapter.create(MockedUser);

      expect(saveSpy).toHaveBeenCalled();
      expect(result).toMatchObject({
        email: MockedUser.email,
        username: MockedUser.username,
        password: MockedUser.password,
      });
    });
  });

  describe("findByEmail", () => {
    it("should map InfrastructureUser to MockedUser when found", async () => {
      const foundUser = {
        id: MockedUser.id,
        email: MockedUser.email,
        username: MockedUser.username,
        password: MockedUser.password,
        createdAt: MockedUser.createdAt,
        updatedAt: MockedUser.updatedAt,
      };
      const findOneBySpy = jest
        .spyOn(InfrastructureUser, "findOneBy")
        .mockResolvedValue(foundUser as InfrastructureUser);

      const result = await userRepositoryAdapter.findByEmail(MockedUser.email);

      expect(findOneBySpy).toHaveBeenCalledWith({ email: MockedUser.email });
      expect(result).toEqual(MockedUser);

      findOneBySpy.mockRestore();
    });

    it("should return null if user is not found", async () => {
      const findOneBySpy = jest
        .spyOn(InfrastructureUser, "findOneBy")
        .mockResolvedValue(null);

      const result = await userRepositoryAdapter.findByEmail(MockedUser.email);

      expect(findOneBySpy).toHaveBeenCalledWith({ email: MockedUser.email });
      expect(result).toBeNull();

      findOneBySpy.mockRestore();
    });
  });

  describe("findByUsername", () => {
    it("should map InfrastructureUser to MockedUser when found", async () => {
      const foundUser = {
        id: MockedUser.id,
        email: MockedUser.email,
        username: MockedUser.username,
        password: MockedUser.password,
        createdAt: MockedUser.createdAt,
        updatedAt: MockedUser.updatedAt,
      };
      const findOneBySpy = jest
        .spyOn(InfrastructureUser, "findOneBy")
        .mockResolvedValue(foundUser as any);

      const result = await userRepositoryAdapter.findByUsername(MockedUser.username);

      expect(findOneBySpy).toHaveBeenCalledWith({ username: MockedUser.username });
      expect(result).toEqual(MockedUser);

      findOneBySpy.mockRestore();
    });

    it("should return null if user is not found", async () => {
      const findOneBySpy = jest
        .spyOn(InfrastructureUser, "findOneBy")
        .mockResolvedValue(null);

      const result = await userRepositoryAdapter.findByUsername(MockedUser.username);

      expect(findOneBySpy).toHaveBeenCalledWith({ username: MockedUser.username });
      expect(result).toBeNull();

      findOneBySpy.mockRestore();
    });
  });
});

