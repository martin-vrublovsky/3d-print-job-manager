import Ajv from 'ajv';
import printJob3DDao from '../../dao/print-job-3d-dao.js';
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

const deleteAbl = async (req, res) => {
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

    const printJob3DList = await printJob3DDao.listByStateId(stateDtoIn.id);

    if (printJob3DList.length > 0) {
      const error = new Error(
        'Cannot delete state because it has related 3D print job(s)'
      );
      error.code = 'stateHasRelatedPrintJobs3D';
      error.status = 409;
      error.details = { printJobs3DCount: printJob3DList.length };
      throw error;
    }

    const state = await stateDao.remove(stateDtoIn.id);

    if (!state) {
      const error = new Error(`State with id ${stateDtoIn.id} not found`);
      error.code = 'stateNotFound';
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
};

export default deleteAbl;
