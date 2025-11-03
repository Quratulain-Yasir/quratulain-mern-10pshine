
// 1 imports needed to acccess the user register functionality


import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../server.js";
import User from "../src/models/userModel.js";


let mongoServer;

// create and connect to fake MongoDB before all tests run
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri)
});
// disconnect and stop MongoDB after all tests run 
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
// clear database before each test
beforeEach(async() => {
    await User.deleteMany();
})

// start describing test suite
describe("POST /api/user/register" , () => {
    // test case 1 : successful user registeration
    test("should register a new user successfully" , async() => {
        const res = await request(app)
        .post("/api/user/register")
.send({
    "name" : "Noor Jon" , 
    "email" : "noorjon@gmail.com" , 
    "password" : "Noor6789064j"
})

expect(res.status).toBe(201);
expect(res.body.message).toBe("USER created successfully");
expect(res.body.user.email).toBe("noorjon@gmail.com");


    const userInDb = await User.findOne({email : "noorjon@gmail.com"});
    expect(userInDb).not.toBeNull();
    })
// case 2: Missing fields
test("should return 400 if required fields are missing" , async() => {
    const res = await request(app)
    .post("/api/user/register").send({email: "" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("All fields required");
})

  // 🚫 Case 3: Duplicate email
  test("should return 409 if email already exists" , async() => {
    await User.create({ 
    "name" : "Ali J" , 
    "email" : "alij@gmail.com" , 
    "password" : "alij789064j"
})
const res = await request(app)
.post("/api/user/register").send({
    "name" : "Ali J" , 
    "email" : "alij@gmail.com" , 
    "password" : "alij789064j"
})

expect(res.status).toBe(409);
expect(res.body.message).toBe("User already exists with this email")
  })

})


