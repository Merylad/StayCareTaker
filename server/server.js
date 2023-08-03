import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import urouter from "./routes/users.js";
import crouter from "./routes/clients.js";
import arouter from "./routes/appts.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/users', urouter);
app.use('/clients', crouter);
app.use('/appts', arouter);


app.listen(process.env.PORT, ()=>{
    console.log("listenning on port " + process.env.PORT);
})
