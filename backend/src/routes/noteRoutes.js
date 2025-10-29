import express from "express"
import { createNote , getNotes , getOneNote , updateNote , deleteNote } from "../controllers/noteController.js"
import auth from "../middleware/auth.js"

const noteRoute = express.Router()
noteRoute.post("/create" , auth , createNote)

noteRoute.get("/read" , auth , getNotes)

noteRoute.get("/read-one/:id" , auth , getOneNote)

noteRoute.post("/update/:id" , auth , updateNote )
 
noteRoute.post("/delete/:id" , auth , deleteNote )


export default noteRoute
