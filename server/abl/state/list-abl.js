import stateDao from '../../dao/state-dao.js';

const listAbl = async (req, res) => {
    try {
        const stateList = await stateDao.list();
        res.json({ stateList });
    } catch (error) {
        res.status(error.status || 500).json({
            code: error.code || 'internalServerError',
            message: error.message || 'Unexpected error occurred',
            details: error.details || undefined,
        });
    }
}

export default listAbl;
