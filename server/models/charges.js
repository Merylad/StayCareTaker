import db from "../config/db.js";

export const getAllCharges = ()=>{
    return db('charges')
    .select('*')
}

export const addCharges = (appt_id, name, amount, currency,date)=>{
    return db('charges')
    .insert({appt_id, name, amount, currency,date})
    .returning('*')
}

export const updateCharges = (appt_id, name, amount, currency,date, id) =>{
    return db('charges')
    .update ({appt_id, name, amount, currency,date})
    .where ({charge_id : id})
    .returning('*')
}

export const deleteCharges = (id) =>{
    return db('charges')
    .where ({charge_id : id})
    .del()
    .returning('*')
}