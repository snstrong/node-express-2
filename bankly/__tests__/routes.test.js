// Set ENV VAR to test before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const db = require("../db");
const bcrypt = require("bcrypt");
const createToken = require("../helpers/createToken");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

// tokens for our sample users
const tokens = {};

/** before each test, insert u1, u2, and u3  [u3 is admin] */

beforeEach(async function () {
  async function _pwd(password) {
    return await bcrypt.hash(password, 1);
  }

  let sampleUsers = [
    ["u1", "fn1", "ln1", "email1", "phone1", await _pwd("pwd1"), false],
    ["u2", "fn2", "ln2", "email2", "phone2", await _pwd("pwd2"), false],
    ["u3", "fn3", "ln3", "email3", "phone3", await _pwd("pwd3"), true],
  ];

  for (let user of sampleUsers) {
    await db.query(
      `INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      user
    );
    tokens[user[0]] = createToken(user[0], user[6]);
  }
});

describe("POST /auth/register", function () {
  test("should allow a user to register", async function () {
    const response = await request(app).post("/auth/register").send({
      username: "new_user",
      password: "new_password",
      first_name: "new_first",
      last_name: "new_last",
      email: "new@newuser.com",
      phone: "1233211221",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ token: expect.any(String) });

    let { username, admin } = jwt.verify(response.body.token, SECRET_KEY);
    expect(username).toBe("new_user");
    expect(admin).toBe(false);
  });
  // TESTS BUG #1
  test("should throw error for invalid data", async function () {
    const response = await request(app).post("/auth/register").send({
      username: "new_user",
      password: "new_password",
      first_name: "new_first",
      last_name: "new_last",
      email: "notanemailaddress",
      phone: "100100100",
    });
    expect(response.statusCode).toBe(400);
  });
  // TESTS BUG #1
  test("should throw error for too many fields", async function () {
    const response = await request(app).post("/auth/register").send({
      username: "new_user",
      password: "new_password",
      first_name: "new_first",
      last_name: "new_last",
      email: "notanemailaddress",
      phone: "100100100",
      bad_field: "shouldn't be here",
    });
    expect(response.statusCode).toBe(400);
  });

  test("should not allow a user to register with an existing username", async function () {
    const response = await request(app).post("/auth/register").send({
      username: "u1",
      password: "pwd1",
      first_name: "new_first",
      last_name: "new_last",
      email: "new@newuser.com",
      phone: "1233211221",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: `There already exists a user with username 'u1'`,
    });
  });
});

describe("POST /auth/login", function () {
  test("should allow a correct username/password to log in", async function () {
    const response = await request(app).post("/auth/login").send({
      username: "u1",
      password: "pwd1",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ token: expect.any(String) });

    let { username, admin } = jwt.verify(response.body.token, SECRET_KEY);
    expect(username).toBe("u1");
    expect(admin).toBe(false);
  });
  test("should deny access for incorrect username/password", async function () {
    const response = await request(app).post("/auth/login").send({
      username: "u1",
      password: "pwd2",
    });
    expect(response.statusCode).toBe(401);
  });
});

describe("GET /users", function () {
  test("should deny access if no token provided", async function () {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(401);
  });

  test("should list all users", async function () {
    const response = await request(app)
      .get("/users")
      .set("authorization", `bearer ${tokens.u1}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.users.length).toBe(3);
  });
  // TESTS BUG
  test("should return correct user information", async function () {
    const response = await request(app)
      .get("/users")
      .set("authorization", `bearer ${tokens.u1}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.users).toEqual([
      { username: "u1", firstName: "fn1", lastName: "ln1" },
      { username: "u2", firstName: "fn2", lastName: "ln2" },
      { username: "u3", firstName: "fn3", lastName: "ln3" },
    ]);
  });
});

describe("GET /users/[username]", function () {
  test("should deny access if no token provided", async function () {
    const response = await request(app).get("/users/u1");
    expect(response.statusCode).toBe(401);
  });

  test("should return data on u1", async function () {
    const response = await request(app)
      .get("/users/u1")
      .set("authorization", `bearer ${tokens.u1}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      username: "u1",
      first_name: "fn1",
      last_name: "ln1",
      email: "email1",
      phone: "phone1",
    });
  });
});

describe("PATCH /users/[username]", function () {
  test("should deny access if no token provided", async function () {
    const response = await request(app).patch("/users/u1");
    expect(response.statusCode).toBe(401);
  });

  test("should deny access if not admin/right user", async function () {
    const response = await request(app)
      .patch("/users/u1")
      .set("authorization", `bearer ${tokens.u2}`); // wrong user!
    expect(response.statusCode).toBe(401);
  });

  test("should patch data if admin", async function () {
    const response = await request(app)
      .patch("/users/u1")
      .send({ first_name: "new-fn1" })
      .set("authorization", `bearer ${tokens.u3}`); // u3 is admin
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      username: "u1",
      first_name: "new-fn1",
      last_name: "ln1",
      email: "email1",
      phone: "phone1",
      admin: false,
      password: expect.any(String),
    });
  });

  test("should not allow admin status to be patched", async function () {
    const response = await request(app)
      .patch("/users/u1")
      .send({ admin: true })
      .set("authorization", `bearer ${tokens.u1}`);
    expect(response.statusCode).toBe(400);
  });

  // TESTS BUG #2
  test("should throw error for invalid data", async function () {
    const response = await request(app)
      .patch("/users/u1")
      .send({ email: "nope", admin: true })
      .set("authorization", `bearer ${tokens.u1}`);
    expect(response.statusCode).toBe(400);

    const response1 = await request(app)
      .patch("/users/u1")
      .send({ phone: "123456789", admin: true })
      .set("authorization", `bearer ${tokens.u1}`);
    expect(response.statusCode).toBe(400);
  });

  // TESTS BUG #2
  test("should throw error for disallowed fields", async function () {
    const response = await request(app)
      .patch("/users/u1")
      .send({ notAllowed: "blahblahblah", admin: true })
      .set("authorization", `bearer ${tokens.u1}`);
    expect(response.statusCode).toBe(400);
  });

  test("should return 404 if cannot find", async function () {
    const response = await request(app)
      .patch("/users/not-a-user")
      .send({ first_name: "new-fn" })
      .set("authorization", `bearer ${tokens.u3}`); // u3 is admin
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /users/[username]", function () {
  test("should deny access if no token provided", async function () {
    const response = await request(app).delete("/users/u1");
    expect(response.statusCode).toBe(401);
  });

  test("should deny access if not admin", async function () {
    const response = await request(app)
      .delete("/users/u1")
      .set("authorization", `bearer ${tokens.u1}`);
    expect(response.statusCode).toBe(401);
  });

  test("should allow if admin", async function () {
    const response = await request(app)
      .delete("/users/u1")
      .set("authorization", `bearer ${tokens.u3}`); // u3 is admin
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "deleted" });
  });
});

afterEach(async function () {
  await db.query("DELETE FROM users");
});

afterAll(function () {
  db.end();
});
