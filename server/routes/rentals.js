import express from "express";
import { _getAllRentals, _getRentalById } from "../controllers/rentals.js";

const rrouter = express.Router();

rrouter.get('/', _getAllRentals);
rrouter.get('/:id', _getRentalById);

export default rrouter;