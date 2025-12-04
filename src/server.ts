import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source"

import {userRouter} from "./infrastructure/web/express/router/user.router";

import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

const app = express();
const origin = process.env.ORIGIN;
app.use(cors({
    origin,
    credentials: true
}))
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
dotenv.config();

app.get("/", (_, res) => res.send("running"));
app.use("/api/users", userRouter)

app.use(express.static("public"));

let port = 4000;
app.listen(port, async () => {
    console.log(`server running at ${process.env.APP_URL}`);

    AppDataSource.initialize().then(() =>  {
        console.log("database initialized")
    }).catch(error => console.log(error))

})