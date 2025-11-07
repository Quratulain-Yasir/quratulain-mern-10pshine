import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import app from "../server.js";
import Note from "../src/models/noteModel.js";

let mongoServer;

// 🧱 1️⃣ Start in-memory MongoDB before tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// 🧹 2️⃣ Clear DB before each test
beforeEach(async () => {
  await Note.deleteMany();
});

// 🧹 3️⃣ Disconnect after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("🧾 Note CRUD API", () => { 

  // ➕ CREATE
test("should create a new note", async () => {
  const res = await request(app)
    .post("/api/note/create")
    .send({
      content: "Biscuits are my favorite. I love them because they have the perfect amount of sweetness!",
    });

  expect(res.status).toBe(201);
  expect(res.body.message).toBe("Note created successfully");
});

  // 📄 READ ALL
  test("should get all notes", async () => { 
 const testUserId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439011");

  // 🧩 insert a note for that same user
  await Note.create({ content: "First Note", user: testUserId });
 
  const res = await request(app)
    .get("/api/note/read") 

  // ✅ check results
  expect(res.status).toBe(200);
  expect(res.body.data.length).toBeGreaterThan(0);
});

   // 📄 READ single
     test("should get single note", async () => {  
 
    const note = await Note.create({
      content: "This is a single note test",
      user:  new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")
    });
 
  const res = await request(app)
    .get(`/api/note/read-one/${note._id}`) 

  // ✅ check results
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.data).toHaveProperty("_id", note._id.toString());
  expect(res.body.data).toHaveProperty("content", "This is a single note test");
});

  // ✏️ UPDATE
  test("should update an existing note", async () => { 

    const note = await Note.create({
      content: "Old content",
      user: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
    });

    const res = await request(app)
      .post(`/api/note/update/${note._id}`) 
      .send({ content: "Updated content" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Note updated successfully");
  });

  // ❌ DELETE
  test("should delete a note", async () => {
    const note = await Note.create({
      content: "Temporary note",
      user: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")
    });

    const res = await request(app)
      .post(`/api/note/delete/${note._id}`) 

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Note deleted successfully");
  });
});

 
