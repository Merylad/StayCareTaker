import { getAllCharges, addCharges, updateCharges, deleteCharges } from "../models/charges.js";

export const _getAllCharges = async (req,res)=>{
    try {
        const row = await getAllCharges();
        res.json(row);
    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}

export const _addCharges = async (req, res) =>{
    const {appt_id, name, amount, currency,date} = req.body;
    try{
        const row = await addCharges(appt_id, name, amount, currency,date);
        res.json({msg: 'Charge added successfully', charge: row})
    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('});
}
}

export const _updateCharges = async (req,res) =>{
    const {appt_id, name, amount, currency,date} = req.body;
    const id = req.params.id;
    try{
        const row = await updateCharges(appt_id, name, amount, currency,date, id);
        res.json({msg: 'Charge updated successfully', charge: row})
    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('});
}
}

export const _deleteCharges = async (req, res) =>{
    const id = req.params.id;
    try{
        const row = await deleteCharges(id);
        res.json({msg: 'Charge deleted successfully', charge: row})
    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'Something went wrong :('});
}
}