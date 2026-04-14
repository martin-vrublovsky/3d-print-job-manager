import Ajv from 'ajv';
import stateDao from '../../dao/state-dao.js';

const ajv = new Ajv();

const stateSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 32, maxLength: 32 },
        name: { type: 'string', minLength: 2, maxLength: 30 },
        colorCode: {
            type: 'string',
            pattern: '^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$',
        },
    },
    required: ['id'],
    additionalProperties: false,
    anyOf: [
        { required: ['name'] },
        { required: ['colorCode'] },
    ],
};

const updateAbl = async (req, res) => {
    try {
        const stateDtoIn = req.body;

        const dtoInIsValid = ajv.validate(stateSchema, stateDtoIn);

        if (!dtoInIsValid) {
            const error = new Error('dtoIn is not valid');
            error.code = 'dtoInIsNotValid';
            error.status = 400;
            error.details = ajv.errors;
            throw error;
        }

        const updatedState = await stateDao.update(stateDtoIn);

        if (!updatedState) {
            const error = new Error(`State with id ${stateDtoIn.id} not found`);
            error.code = 'stateNotFound';
            error.status = 404;
            throw error;
        }

        res.json(updatedState);
    } catch (error) {
        res.status(error.status || 500).json({
            code: error.code || 'internalServerError',
            message: error.message || 'Unexpected error occurred',
            details: error.details || undefined,
        });
    }
}

export default updateAbl;
