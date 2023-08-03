import { getAllClients, addClient } from "../models/clients.js";

export const _getAllClients = async (req, res) =>{
    try{
        const row = await getAllClients()
        res.json(row);
    } catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('})
    }
}

export const _addClient = async (req, res) =>{
    const {firstname, lastname, email, phone} = req.body
    const lower_email = email.toLowerCase()
    try{
        const row = await addClient(firstname, lastname, lower_email, phone);
        res.json({msg: 'successfully added', user: row});
    } catch(error){
        console.log(error);
        res.status(404).json({msg: 'The email already exists :('})
    }
}