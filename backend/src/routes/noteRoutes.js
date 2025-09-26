import express from "express"
import { createNote , updateNote , deleteNote } from "../controllers/noteController.js"


const noteRoute = express.Router()
noteRoute.post("/create" , createNote)

noteRoute.post("/update" , updateNote )
 
 noteRoute.post("/delete" , deleteNote )


export default noteRoute
