import express from "express"
import { createNote , updateNote , deleteNote } from "../controllers/noteController.js"
import auth from "../middleware/auth.js"

const noteRoute = express.Router()
noteRoute.post("/create" , auth , createNote)

noteRoute.post("/update/:id" , auth , updateNote )
 
 noteRoute.post("/delete/:id" , auth , deleteNote )


export default noteRoute
