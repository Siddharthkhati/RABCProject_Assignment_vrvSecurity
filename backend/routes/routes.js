import express from 'express';
import { create, get, updated, deleteUser } from '../controllers/usercontrollers.js';

const routers = express.Router();

// Routes for User CRUD Operations
routers.post('/create', create);
routers.get('/get', get);
routers.put('/update/:id', updated);
routers.delete('/delete/:id', deleteUser);

export default routers;
