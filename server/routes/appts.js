import express from "express";
import { _getAllAppts, _getApptById, _getApptByUserId, _addAppt, _updateAppt, _deleteAppt } from "../controllers/appts.js";

const arouter = express.Router();

arouter.get('/', _getAllAppts);
arouter.get('/byappt/:id', _getApptById);
arouter.get('/byuser/:id', _getApptByUserId);
arouter.post('/', _addAppt);
arouter.put('/:id', _updateAppt);
arouter.delete('/:id', _deleteAppt);

export default arouter;
