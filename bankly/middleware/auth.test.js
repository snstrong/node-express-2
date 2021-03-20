"use strict";

const jwt = require("jsonwebtoken");
const { requireAdminOrCorrectUser } = require("./auth");
const { authUser } = require("./auth");
const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign({ username: "test", admin: false }, SECRET_KEY);
const badJwt = jwt.sign({ username: "test", admin: false }, "wrongKey");

// TESTS BUG #5 & #6
describe("authUser", function () {
  test("works: token via header", function () {
    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = {};
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authUser(req, res, next);
    expect(req.curr_username).toEqual("test");
    expect(req.curr_admin).toEqual(false);
  });
  test("works: no header", function () {
    const req = {};
    const res = {};
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authUser(req, res, next);
    expect(req).toEqual({});
  });
  test("works: invalid token throws error", function () {
    const req = { headers: { authorization: `Bearer ${badJwt}` } };
    const res = {};
    const next = function (err) {
      expect(err).toBeTruthy();
      expect(err.status).toEqual(401);
    };
    authUser(req, res, next);
    expect(req.curr_username).toBeFalsy();
  });
});
