import express from 'express';
import createAbl from '../abl/print-job-3d/create-abl.js';

const router = express.Router();

router.post('/create', createAbl);

export default router;
