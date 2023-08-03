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

export const addRental = (user_id, appt_id, client_id, arrival, departure, price_per_night, currency, origin , confirmed) =>{
    return db('rentals')
    .insert({user_id, appt_id, client_id, arrival, departure, price_per_night, currency, origin , confirmed})
    .returning('*')
}