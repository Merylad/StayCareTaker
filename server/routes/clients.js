import express from "express";
import { _getAllClients,_getClientById, _addClient, _deleteClient, _updateClient } from "../controllers/clients.js";

const crouter = express.Router()

crouter.get('/', _getAllClients);
crouter.get('/:id', _getClientById);
crouter.post('/', _addClient);
crouter.delete('/:id', _deleteClient);
crouter.put('/:id', _updateClient)

export default crouter;