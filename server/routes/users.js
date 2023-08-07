import express from 'express';
import { _getAllUsers, _register, _login, _deleteUser, _updatePassword, _logout  } from '../controllers/users.js';

const urouter = express.Router()

urouter.get('/', _getAllUsers);
urouter.post('/register', _register);
urouter.post('/login', _login);
urouter.delete('/user/:id', _deleteUser);
urouter.delete('/logout', _logout);
urouter.put('/password/:id', _updatePassword);

export default urouter;