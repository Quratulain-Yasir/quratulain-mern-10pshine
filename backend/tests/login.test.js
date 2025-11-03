import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../server.js";
import User from "../src/models/userModel.js";

let mongoServer;

// Create and connect to fake MongoDB before all tests run
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
})
// Disconnect and stop MongoDB after all tests run
afterAll(async () => {
 await mongoServer.stop();
 await mongoose.disconnect();
})
// clear database before each test
beforeEach(async () => {
    await User.deleteMany();
})
// Start describing test suite
describe("POST /api/user/login" , () => {
    // test case 1 : successful login
    test("should login user successfully" , async () => {
await request(app)
  .post("/api/user/register")
  .send({
    name: "Noor Jon",
    email: "noorjon@gmail.com",
    password: "Noor6789064j",
  });

    const res = await request(app)
    .post("/api/user/login")
    .send({  
    "email" : "noorjon@gmail.com" , 
    "password" : "Noor6789064j"
})

    expect (res.status).toBe(200)
    expect(res.body.message).toBe("User login Successfully");
    expect(res.body.token).toBeDefined()
    })

// test case 2 : fail login if user not exists
test("should fail login if  user does not exit" , async () => {
    const res = await request(app)
    .post("/api/user/login")
    .send({
    "email" : "farhan@gmail.com" , 
    "password" : "farhan789064j"
    })
    
    expect(res.status).toBe(404)
    expect(res.body.message).toBe("user does not found")
})

// test case 3 : fail login if user provides wrong password
test("should fail login if user provides wrong password" , async() => {
    await User.create({
    "name" : "Aisha Khan" , 
    "email" : "luna@gmail.com" , 
    "password" : "luna789064j" , 
    })

    const res = await request(app)
    .post("/api/user/login")
    .send({
    "email" : "luna@gmail.com" , 
    "password" : "luna789j" , 
    })

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid Credentials");
})

})
