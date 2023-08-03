import { getAllRentals, getRentalById, addRental } from "../models/rentals.js";

export const _getAllRentals = async (req,res)=>{
    try{
        const row = await getAllRentals();
        res.json(row);
    }catch(e){
        console.log(e);
        res.status(404).json({msg: "Something went wrong :("})
    }
}

export const _getRentalById = async (req, res)=>{
    const id = req.params.id;
    try{
        const row = await getRentalById(id);
        res.json(row);
    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}

export const _addRental = async (req,res) =>{
    const {user_id, appt_id, client_id, arrival, departure, price_per_night, currency, origin , confirmed} = req.body;
    if (departure < arrival) return res.json({msg: "The departure date must be after the arrival date"})
    try{
        const row = await addRental(user_id, appt_id, client_id, arrival, departure, price_per_night, currency, origin , confirmed);
        res.json({msg: 'Rental added successfully', rental : row});
    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}