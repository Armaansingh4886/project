import express from "express";
import {register, login, getProffessionalBySearch} from '../controllers/proffessionalsController.js';

const router = express.Router()

router.post('/register', register);
router.post('/login', login);

router.post('/getProffessionalBySearch', getProffessionalBySearch);

export default router;