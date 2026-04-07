import express from 'express';
import createAbl from '../abl/state/create-abl.js';
import listAbl from '../abl/state/list-abl.js';

const router = express.Router();

router.post('/create', createAbl);
router.get('/list', listAbl);

export default router;
