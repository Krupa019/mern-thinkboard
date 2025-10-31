import express from "express"
import rateLimiter from "./src/middleware/rateLimiter.js";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js"


const app = express()
const PORT = process.env.PORT || 5002


//middleware
app.use(cors({
    origin: "http://localhost:5173",
}))
app.use(express.json());
app.use(rateLimiter);


// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & url is ${req.url} `)
//     next();

// });
app.use("/api/notes",notesRoutes);
import { connectDB } from "./src/config/db.js";


// const express = require("express")

connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log("APP running on PORT:",PORT)});
});



    
// mongodb+srv://ihhkrupa_db_user:Kjt1wQodDNgF582u@cluster0.piw7qak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0