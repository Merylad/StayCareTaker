import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import multer from 'multer';
import cookieParser from "cookie-parser";
import urouter from "./routes/users.js";
import crouter from "./routes/clients.js";
import arouter from "./routes/appts.js";
import rrouter from "./routes/rentals.js";
import chrouter from "./routes/charges.js";

dotenv.config();
const app = express();

const upload = multer()
app.use(upload.array())




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use('/users', urouter);
app.use('/clients', crouter);
app.use('/appts', arouter);
app.use('/rentals', rrouter);
app.use('/charges', chrouter);


app.listen(process.env.PORT, ()=>{
    console.log("listenning on port " + process.env.PORT);
})
