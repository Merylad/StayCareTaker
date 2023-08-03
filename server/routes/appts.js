import express from "express";
import { _getAllAppts, _getApptById, _addAppt, _updateAppt, _deleteAppt } from "../controllers/appts.js";

const arouter = express.Router();

arouter.get('/', _getAllAppts);
arouter.get('/:id', _getApptById);
arouter.post('/', _addAppt);
arouter.put('/:id', _updateAppt);
arouter.delete('/:id', _deleteAppt);

export default arouter;
