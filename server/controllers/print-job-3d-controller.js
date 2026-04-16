import express from 'express';
import createAbl from '../abl/print-job-3d/create-abl.js';
import listAbl from '../abl/print-job-3d/list-abl.js';
import getAbl from '../abl/print-job-3d/get-abl.js';

const router = express.Router();

router.post('/create', createAbl);
router.get('/list', listAbl);
router.get('/get', getAbl);

export default router;
