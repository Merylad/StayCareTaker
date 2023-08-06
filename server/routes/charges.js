import express from 'express';
import { _getAllCharges, _addCharges, _updateCharges, _deleteCharges  } from "../controllers/charges.js";


const chrouter = express.Router();

chrouter.get('/', _getAllCharges);
chrouter.post('/', _addCharges);
chrouter.put('/:id', _updateCharges);
chrouter.delete('/:id', _deleteCharges);

export default chrouter;