import express from 'express';
import createAbl from '../abl/state/create-abl.js';
import listAbl from '../abl/state/list-abl.js';
import getAbl from '../abl/state/get-abl.js';

const router = express.Router();

router.post('/create', createAbl);
router.get('/list', listAbl);
router.get('/get', getAbl);

export default router;
