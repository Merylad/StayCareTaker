import express from 'express';
import { _getAllUsers, _register, _login, _deleteUser, _updatePassword  } from '../controllers/users.js';

const urouter = express.Router()

urouter.get('/', _getAllUsers);
urouter.post('/register', _register);
urouter.post('/login', _login);
urouter.delete('/:id', _deleteUser);
urouter.put('/password/:id', _updatePassword);

export default urouter;