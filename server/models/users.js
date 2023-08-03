import db from "../config/db.js";

export const getAllUsers = ()=>{
    return db('users')
    .select('*')
}

export const register = (email, username, password, firstname, lastname) =>{
    return db('users')
    .insert({email, username, password, firstname, lastname})
    .returning(['user_id', 'email', 'username', 'password', 'firstname', 'lastname'])
}

export const login = (username) =>{
    return db('users')
    .select('user_id', 'username', 'password')
    .where({username})
}

