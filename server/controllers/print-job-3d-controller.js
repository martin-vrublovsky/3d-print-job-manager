import express from 'express';
import createAbl from '../abl/print-job-3d/create-abl.js';
import listAbl from '../abl/print-job-3d/list-abl.js';
import getAbl from '../abl/print-job-3d/get-abl.js';
import updateAbl from '../abl/print-job-3d/update-abl.js';
import deleteAbl from '../abl/print-job-3d/delete-abl.js';

const router = express.Router();

router.post('/create', createAbl);
router.get('/list', listAbl);
router.get('/get', getAbl);
router.post('/update', updateAbl);
router.post('/delete', deleteAbl);

export default router;
