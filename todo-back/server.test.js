const req = require("supertest");
const app = require("./server");

describe("To test Login", () => {
  describe("given username and password", () => {
    test("should respond with a 200 statuscode", async () => {
      const res = await req(app).post("/login").send({
        email: "abcde@gmail.com",
        password: "12345",
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("given wrong  username and password", () => {
    test("should respond with a statuscode of 400", async () => {
      const res = await req(app).post("/login").send({
        email: "dfdsf",
        password: "654646",
      });
      expect(res.statusCode).toBe(400);
    });
  });
});
