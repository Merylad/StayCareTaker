import express from "express";
import { _getAllClients,_getClientById, _getClientsByUser_id, _addClient, _deleteClient, _updateClient } from "../controllers/clients.js";

const crouter = express.Router()

crouter.get('/', _getAllClients);
crouter.get('/byclient/:id', _getClientById);
crouter.get('/byuser/:id', _getClientsByUser_id)
crouter.post('/', _addClient);
crouter.delete('/:id', _deleteClient);
crouter.put('/:id', _updateClient)

export default crouter;