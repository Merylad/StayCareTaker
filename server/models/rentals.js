import db from "../config/db.js";

export const getAllRentals = () =>{
    return db('rentals')
    .select('*')
}

export const getRentalById = (id) =>{
    return db('rentals')
    .where({rental_id : id})
    .select('*')
}