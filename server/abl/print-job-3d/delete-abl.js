import Ajv from 'ajv';
import printJob3DDao from '../../dao/print-job-3d-dao.js';

const ajv = new Ajv();

const printJob3DSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 32, maxLength: 32 },
    },
    required: ['id'],
    additionalProperties: false,
};

const deleteAbl = async (req, res) => {
    try {
        const printJob3DDtoIn = req.body;

        const dtoInIsValid = ajv.validate(printJob3DSchema, printJob3DDtoIn);

        if (!dtoInIsValid) {
            const error = new Error('dtoIn is not valid');
            error.code = 'dtoInIsNotValid';
            error.status = 400;
            error.details = ajv.errors;
            throw error;
        }

        const printJob3D = await printJob3DDao.remove(printJob3DDtoIn.id);

        if (!printJob3D) {
            const error = new Error(`3D print job with id ${printJob3DDtoIn.id} not found`);
            error.code = '3DPrintJobNotFound';
            error.status = 404;
            throw error;
        }

        res.json({});
    } catch (error) {
        res.status(error.status || 500).json({
            code: error.code || 'internalServerError',
            message: error.message || 'Unexpected error occurred',
            details: error.details || undefined,
        });
    }
}

export default deleteAbl;
