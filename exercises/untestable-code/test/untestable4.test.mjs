import { afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { PasswordService, PostgresUserDao } from "../src/testable4.mjs";

describe("Untestable 4: enterprise application", () => {
  let service;
  let postgresUserDao;
  beforeEach(() => {
    service = new PasswordService();
    postgresUserDao = PostgresUserDao.getInstance();
  });

  afterEach(() => {
    postgresUserDao.close();
  });

  test("database connection options are correct", async () => {
    expect(postgresUserDao.getDb().options.user).to.equal("untestable");
    expect(postgresUserDao.getDb().options.host).to.equal("localhost");
    expect(postgresUserDao.getDb().options.database).to.equal("untestable");
    expect(postgresUserDao.getDb().options.password).to.equal("secret");
    expect(postgresUserDao.getDb().options.port).to.equal(5432);
  });

  test("user is saved and retrieved", async () => {
    const user = { userId: "user", passwordHash: "pass" };
    await postgresUserDao.save(user);
    const retrieved = await postgresUserDao.getById(user.userId);
    expect(retrieved).to.deep.equal(user);
  });
});
