import { getAllRentals, getRentalById } from "../models/rentals.js";

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