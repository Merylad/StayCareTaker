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
    .select('user_id', 'username', 'password', 'last_login')
    .where({username})
    .update ({last_login :new Date})
    .then(()=>{
        return db('users')
        .select('user_id', 'username', 'password', 'last_login')
        .where({ username });
    })
    
}

export const deleteUser = (id)=>{
    return db('users')
    .where({user_id:id})
    .del()
    .returning(['user_id', 'email', 'username', 'password', 'firstname', 'lastname'])
}

export const updatePassword = ( password, id)=>{
    return db('users')
    .select('email', 'username', 'password', 'firstname', 'lastname')
    .where ( {'user_id' : id})
    .update({password})
}
