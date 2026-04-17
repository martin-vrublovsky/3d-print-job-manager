import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import printJob3DDao from '../../dao/print-job-3d-dao.js';
import stateDao from '../../dao/state-dao.js';

const ajv = new Ajv();
addFormats(ajv);

const printJob3DSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 32, maxLength: 32 },
        name: { type: 'string', minLength: 3, maxLength: 100 },
        note: { type: 'string', maxLength: 500 },
        filamentCodeName: { type: 'string', minLength: 2, maxLength: 30 },
        customerName: { type: 'string', minLength: 2, maxLength: 50 },
        totalPrice: { type: 'number', minimum: 0, multipleOf: 0.01 },
        deliveryDue: { type: 'string', format: 'date' },
        stateId: { type: 'string', minLength: 32, maxLength: 32 },
    },
    required: ['id'],
    additionalProperties: false,
    anyOf: [
        { required: ['name'] },
        { required: ['note'] },
        { required: ['filamentCodeName'] },
        { required: ['customerName'] },
        { required: ['totalPrice'] },
        { required: ['deliveryDue'] },
        { required: ['stateId'] },
    ],
};

const updateAbl = async (req, res) => {
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

        if (printJob3DDtoIn.deliveryDue && new Date(printJob3DDtoIn.deliveryDue).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
            const error = new Error('The delivery due date must be the current day or a day in the future');
            error.code = 'invalidDeliveryDueDate';
            error.status = 400;
            throw error;
        }

        let existingState = null;

        if (printJob3DDtoIn.stateId) {
            existingState = await stateDao.get(printJob3DDtoIn.stateId);

            if (!existingState) {
                const error = new Error(`State with id ${printJob3DDtoIn.stateId} does not exist`);
                error.code = 'stateDoesNotExist';
                error.status = 404;
                throw error;
            }
        }

        const updatedPrintJob3D = await printJob3DDao.update(printJob3DDtoIn);

        if (!updatedPrintJob3D) {
            const error = new Error(`3D print job with id ${printJob3DDtoIn.id} not found`);
            error.code = '3DPrintJobNotFound';
            error.status = 404;
            throw error;
        }

        if (!existingState) {
            existingState = await stateDao.get(updatedPrintJob3D.stateId);
        }

        updatedPrintJob3D.state = existingState;
        res.json(updatedPrintJob3D);
    } catch (error) {
        res.status(error.status || 500).json({
            code: error.code || 'internalServerError',
            message: error.message || 'Unexpected error occurred',
            details: error.details || undefined,
        });
    }
}

export default updateAbl;
