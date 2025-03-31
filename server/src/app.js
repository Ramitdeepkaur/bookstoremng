import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
dotenv.config();

const app=express()
app.use(cors(
    // {
    //     origin:'*',
    //     credentials:true
    // }
))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from "./routed/routesuser.js";
import router from './routed/routes.js'
//usage
app.use("/books",router)
app.use("/api", userRouter);
export default app