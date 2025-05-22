import request from "supertest";
import app from "../src/app.js";

describe("GET /api/ping", () => {
  it("ha de respondre amb pong", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("result", "pong");
  });
});
