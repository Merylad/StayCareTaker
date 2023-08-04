import db from "../config/db.js";

export const getAllClients = ()=>{
    return db('clients')
    .select('*')
}

export const getClientById = (id) =>{
    return db('clients')
    .select('*')
    .where({client_id:id})
}

export const getClientsByUser_id = (id) =>{
    return db('clients')
    .select('*')
    .where({user_id:id})
}


export const addClient = (firstname, lastname, email, phone, user_id)=>{
    return db('clients')
    .insert ({firstname, lastname, email, phone, user_id})
    .returning(['client_id', 'firstname', 'lastname', 'email', 'phone', 'user_id'])

}

export const deleteClient = (id)=>{
    return db('clients')
    .where ({client_id : id})
    .del()
    .returning (['client_id', 'firstname', 'lastname', 'email', 'phone', 'user_id'])
}

export const updateClient = (firstname, lastname, email, phone, id)=>{
    return db('clients')
    .select('firstname', 'lastname', 'email', 'phone')
    .where({client_id : id})
    .update({firstname, lastname, email, phone})
    .returning(['firstname', 'lastname', 'email', 'phone'])
}