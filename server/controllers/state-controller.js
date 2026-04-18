import express from 'express';
import createAbl from '../abl/state/create-abl.js';
import listAbl from '../abl/state/list-abl.js';
import getAbl from '../abl/state/get-abl.js';
import updateAbl from '../abl/state/update-abl.js';
import deleteAbl from '../abl/state/delete-abl.js';

const router = express.Router();

router.post('/create', createAbl);
router.get('/list', listAbl);
router.get('/get', getAbl);
router.post('/update', updateAbl);
router.post('/delete', deleteAbl);

export default router;
