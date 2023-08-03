import express from "express";
import { _getAllRentals, _getRentalById, _addRental } from "../controllers/rentals.js";

const rrouter = express.Router();

rrouter.get('/', _getAllRentals);
rrouter.get('/:id', _getRentalById);
rrouter.post('/', _addRental);

export default rrouter;