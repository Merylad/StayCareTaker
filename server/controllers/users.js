import { getAllUsers, register, login } from "../models/users.js";
import bcrypt from 'bcrypt';

export const _getAllUsers = async (req, res)=>{
    
    try{
    const row = await getAllUsers();
    res.json(row);
    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'not found'})
    }
}

export const _register = async (req, res)=>{
    const {email, username, password, firstname, lastname} = req.body
    const lower_email = email.toLowerCase();
    const lower_username = username.toLowerCase();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password+"", salt)

    try{
        const row = await register(lower_email, lower_username, hash, firstname, lastname);
        res.json({msg: 'successfully added', user: row})

    }catch(error){
        if (error.constraint === 'users_username_key'){
            res.status(400).json({ error: 'Username already exists, please chose another one!' });
        } else if (error.constraint === 'users_email_key'){
            res.status(400).json({ error: 'Email already exists, please chose another one!' });
        }else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }
}

export const _login = async (req, res)=>{
    const {username, password} = req.body
    const lower_username = username.toLowerCase();

    try{
        const row = await login(lower_username)
        if (row.length === 0){
            return res.status(404).json({msg: 'Username not found :('})
           }

        const match = await bcrypt.compare(req.body.password+"", row[0].password)
        if(!match) return res.status(400).json({msg: 'Oh! The password is incorrect, try again!'})

        res.json({msg: 'Login successfull'})


    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'something went wrong :('})
    }
}