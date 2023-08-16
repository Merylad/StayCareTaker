import { getAllAppts, getApptById,getApptByUserId, addAppt, updateAppt, deleteAppt, getApptByUserIdExcept } from "../models/appts.js";

export const _getAllAppts = async (req, res) =>{
    try{
        const row = await getAllAppts();
        res.json(row);
    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}

export const _getApptById = async (req, res)=>{
    const id = req.params.id;
    try{
        const row = await getApptById(id);
        res.json(row);
    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}

export const _getApptByUserId = async (req, res)=>{
    const id = req.params.id;
    try{
        const row = await getApptByUserId(id);
        res.json(row);
    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}

export const _addAppt = async(req, res)=>{
    const {user_id, name, city} = req.body;
    const lower_name = name.toLowerCase()
    try {

        const appt_list = await getApptByUserId(user_id);

        for (let appt of appt_list){    
            if (appt.name.toLowerCase() === lower_name){
     return res.status(404).json({msg: 'This name already exists'})
            }
        }

    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('})
    }

    try{
        const row = await addAppt(user_id, lower_name, city);
        res.json({msg: 'Appartment added successfully', appt: row});
    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}

export const _updateAppt = async(req, res) =>{
    const {user_id, name, city} = req.body;
    const id = req.params.id;
    const lower_name = name.toLowerCase()
    try {

        const appt_list = await getApptByUserIdExcept(user_id, id);

        for (let appt of appt_list){    
            if (appt.name.toLowerCase() === lower_name){
     return res.status(404).json({msg: 'This name already exists'})
            }
        }

    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('})
    }

    try{
        const row = await updateAppt(lower_name, city, id);
        res.json ({msg: 'Appartment successfully updated', appt: row});

    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}

export const _deleteAppt = async (req,res) =>{
    const id = req.params.id;
    try{
        const row = await deleteAppt(id);
        res.json ({msg: 'Appartment successfully deleted', appt: row});
    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}