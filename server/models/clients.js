import db from "../config/db.js";

export const getAllClients = ()=>{
    return db('clients')
    .select('*')
}

export const addClient = (firstname, lastname, email, phone)=>{
    return db('clients')
    .insert ({firstname, lastname, email, phone})
    .returning(['client_id', 'firstname', 'lastname', 'email', 'phone'])

}