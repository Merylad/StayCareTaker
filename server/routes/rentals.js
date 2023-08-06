import express from "express";
import { _getAllRentals, _getRentalById, _addRental, _getRentalByAppt_id, _deleteRental, _updateRental } from "../controllers/rentals.js";

const rrouter = express.Router();

rrouter.get('/', _getAllRentals);
rrouter.get('/:id', _getRentalById);
rrouter.post('/', _addRental);
rrouter.get('/byappt/:id', _getRentalByAppt_id);
rrouter.delete('/:id', _deleteRental);
rrouter.put('/:id', _updateRental);

export default rrouter;