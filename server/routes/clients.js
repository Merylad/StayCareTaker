import express from "express";
import { _getAllClients, _addClient } from "../controllers/clients.js";

const crouter = express.Router()

crouter.get('/', _getAllClients);
crouter.post('/', _addClient)

export default crouter;