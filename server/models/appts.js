import db from "../config/db.js";

export const getAllAppts = ()=>{
    return db('appts')
    .select('*')
}

export const getApptById = (id) =>{
    return db('appts')
    .select('*')
    .where({appt_id : id})
}

export const getApptByUserId = (id) =>{
    return db('appts')
    .select('*')
    .where({user_id : id})
}

export const getApptByUserIdExcept = (userid, apptid) =>{
    return db('appts')
    .select('*')
    .where({user_id : userid})
    .whereNot({appt_id : apptid} )
}

export const addAppt = (user_id, name, city) =>{
    return db('appts')    
    .insert({user_id, name, city})
    .returning(['appt_id', 'user_id', 'name', 'city'])
}

export const updateAppt = (name, city, id)=>{
    return db('appts')
    .select('user_id', 'name', 'city')
    .where ({appt_id: id})
    .update({name, city})
    .returning (['appt_id', 'user_id', 'name', 'city'])
}

export const deleteAppt = (id)=>{
    return db('appts')
    .where({appt_id: id})
    .del()
    .returning(['appt_id', 'user_id', 'name', 'city'])
}