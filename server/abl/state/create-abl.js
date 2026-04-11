import Ajv from 'ajv';
import stateDao from '../../dao/state-dao.js';

const ajv = new Ajv({ useDefaults: true });

const stateSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 2, maxLength: 30 },
        colorCode: {
            type: 'string',
            pattern: '^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$',
            default: '#F4F4F4',
        },
    },
    required: ['name'],
    additionalProperties: false,
};

const createAbl = async (req, res) => {
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

        const state = await stateDao.create(stateDtoIn);
        res.json(state);
    } catch (error) {
        res.status(error.status || 500).json({
            code: error.code || 'internalServerError',
            message: error.message || 'Unexpected error occurred',
            details: error.details || undefined,
        });
    }
}

export default createAbl;
