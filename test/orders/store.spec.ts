import request from "supertest";
import app from "../../src/app";
import { createTestConnection } from "../database/connection";

beforeAll(async () => {
  await createTestConnection();
});

describe("login", () => {
  test("it should logged the user", (done) => {
    return request(app)
      .post("/login")
      .set('Accept', 'application/json')
      .send({ email: "admin@grupoboticario.com.br", password: "secret"})
      .expect(200)
      .end((err: any, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("orders", () => {
  test("it should return order list", (done) => {
    return request(app)
      .post("/orders")
      .expect(200)
      .end((err: any, res) => {
        if (err) return done(err);
        done();
      });
  });
});