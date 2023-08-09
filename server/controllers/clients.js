import { getAllClients,getClientById, getClientsByUser_id,getClientByUserExcept, addClient, deleteClient, updateClient  } from "../models/clients.js";

export const _getAllClients = async (req, res) =>{
    try{
        const row = await getAllClients()
        res.json(row);
    } catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('})
    }
}

export const _getClientById = async (req,res)=>{
    const id = req.params.id;
    try{
        const row = await getClientById(id);
        res.json(row);
    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('})
    }
}

export const _getClientsByUser_id = async(req,res)=>{
    const id = req.params.id;
    try{
        const row = await getClientsByUser_id(id);
        res.json(row);
    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('})
    }
}

export const _addClient = async (req, res) =>{
    const {firstname, lastname, email, phone, user_id} = req.body
    const lower_email = email.toLowerCase()
    try{
        const client_list = await getClientsByUser_id(user_id)
        for (const client of client_list){
        if (client.email === email){
            return res.status(404).json({msg: 'This email already exists'})
        }
        if (client.phone === phone){
            return res.status(404).json({msg: 'This phone number already exists'})
        }
    }
    } catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('})
    }
    

    
    try{
        const row = await addClient(firstname, lastname, lower_email, phone, user_id);
        res.json({msg: 'successfully added', user: row});
    } catch(error){
        console.log(error);
        res.status(404).json({msg: 'The email already exists :('})
    }
}

export const _deleteClient = async (req, res) =>{
    const id = req.params.id
    try{
        const row = await deleteClient(id);
        res.json( {msg: 'Successfully deleted', client: row})
    }catch(e) {
        console.log(e)
        res.status(404).json({msg: 'Something went wrong :('})
    }
}

export const _updateClient = async (req, res) =>{
    const {firstname, lastname, email, phone, user_id} = req.body
    const lower_email = email.toLowerCase();
    const client_id = req.params.clientid

    try{
        const client_list = await getClientByUserExcept(user_id, client_id);
        for (const client of client_list){
            if (client.email === email){
                return res.status(404).json({msg: 'This email already exists'})
            }
            if (client.phone === phone){
                return res.status(404).json({msg: 'This phone number already exists'})
            }}

    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('})
    }

    try{
        const row = await updateClient(firstname, lastname, lower_email, phone, client_id)
        res.json({msg: 'The client has been successfullu updated', client: row})

    }catch(e){
        console.log(e)
        res.status(404).json({msg: 'Something went wrong :('})
    }
}