import {faker} from "@faker-js/faker";

export const UserFactory = () =>  ({
    id: faker.number.int(100),
    email: faker.internet.email(),
    username: faker.string.alphanumeric(10),
    password: faker.string.alphanumeric(10),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  });