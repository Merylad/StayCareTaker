import { getAllUsers, register, login, deleteUser, updatePassword } from "../models/users.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

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
    const {username, password} = req.body;
    const lower_username = username.toLowerCase();

    try{
        const row = await login(lower_username);
        if (row.length === 0){
            return res.status(404).json({msg: 'Username not found :('});
           }

        const match = await bcrypt.compare(password+"", row[0].password);
        if(!match) return res.status(400).json({msg: 'Oh! The password is incorrect, try again!'});

        const user_id = row[0].user_id;
        const username = row[0].username;
        const firstname = row[0].firstname;
        const lastname = row[0].lastname;
        const secret = process.env.ACCES_TOKEN_SECRET;

        const accessToken = jwt.sign({user_id, username,firstname, lastname }, secret, {
            expiresIn: "1d"
        } );

        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000
        })



        res.json({msg: 'Login successfull', user: row, token: accessToken});


    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'something went wrong :('});
    }
}

export const _deleteUser = async (req,res)=>{
    const id = req.params.id;
    try{
        const row = await deleteUser(id);
        res.json({msg: 'successfully deleted', user: row})
    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'something went wrong :('})
    }
}

export const _updatePassword = async (req, res) =>{
    const {username, last_password, new_password} = req.body;
    const id = req.params.id;
    const lower_username = username.toLowerCase();
    
    


    try{
        const row = await login(lower_username)
        if (row.length === 0){
            return res.status(404).json({msg: 'Username not found :('})
           }
        const match = await bcrypt.compare(last_password, row[0].password);
        if(!match) return res.status(400).json({msg: 'The old password is incorrect, password update failed!'})

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(new_password+"", salt)

        const data = await updatePassword(hash, id)
        res.json({msg: 'Password updated successfully'})


    }catch(error){
        console.log(error);
        res.status(404).json({msg: 'something went wrong :('})
    }
}

export const _logout = (req, res) =>{
    res.clearCookie('token');
    return res.sendStatus(200)
}