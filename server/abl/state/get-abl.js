import Ajv from 'ajv';
import stateDao from '../../dao/state-dao.js';

const ajv = new Ajv();

const stateSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 32, maxLength: 32 },
    },
    required: ['id'],
    additionalProperties: false,
};

const getAbl = async (req, res) => {
    try {
        const stateDtoIn = req.query?.id ? req.query : req.body;

        const dtoInIsValid = ajv.validate(stateSchema, stateDtoIn);

        if (!dtoInIsValid) {
            const error = new Error('dtoIn is not valid');
            error.code = 'dtoInIsNotValid';
            error.status = 400;
            error.details = ajv.errors;
            throw error;
        }

        const state = await stateDao.get(stateDtoIn.id);

        if (!state) {
            const error = new Error(`State with id ${stateDtoIn.id} not found`);
            error.code = 'stateNotFound';
            error.status = 404;
            throw error;
        }

        res.json(state);
    } catch (error) {
        res.status(error.status || 500).json({
            code: error.code || 'internalServerError',
            message: error.message || 'Unexpected error occurred',
            details: error.details || undefined,
        });
    }
}

export default getAbl;
