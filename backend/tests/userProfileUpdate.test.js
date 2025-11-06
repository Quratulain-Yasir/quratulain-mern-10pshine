import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose"; 
import app from "../server.js";
import User from "../src/models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany();
});

describe("GET /api/user/update-user-profile", () => {
  test("should update user profile data successfully", async () => {
 const fakeId = "507f1f77bcf86cd799439011"
    // ✅ create test user
    const user = await User.create({
      _id : fakeId ,
      name: "Aisha Khan",
      email: "luna@gmail.com",
      password: "luna789064j"
    }); 


    // ✅ call API with token
    const res = await request(app)
      .post("/api/user/update-user-profile")
      .send({
        name: "ALim" , 
        email : "alim@gmail.com"
      })

expect(res.status).toBe(200);
expect(res.body.success).toBe(true);
expect(res.body.message).toBe("Profile Updated");
  });
});