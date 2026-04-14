import printJob3DDao from '../../dao/print-job-3d-dao.js';
import stateDao from '../../dao/state-dao.js';

const groupAndSortByDeliveryDue = (printJob3DList) => {
    const groups = {};

    printJob3DList.forEach((printJob3D) => {
        const key = printJob3D.deliveryDue;

        if (!groups[key]) {
            groups[key] = [];
        }

        groups[key].push(printJob3D);
    });

    const sortedKeys = Object.keys(groups).sort((a, b) => {
        return new Date(a) - new Date(b);
    });

    const sortedGroups = {};
    sortedKeys.forEach((key) => {
        sortedGroups[key] = groups[key];
    });

    return sortedGroups;
}

const listAbl = async (req, res) => {
    try {
        const printJob3DList = await printJob3DDao.list();
        const stateMap = await stateDao.getMap();

        const printJob3DGroupedAndSortedList = groupAndSortByDeliveryDue(printJob3DList);

        res.json({ printJob3DGroupedAndSortedList, stateMap });
    } catch (error) {
        res.status(error.status || 500).json({
            code: error.code || 'internalServerError',
            message: error.message || 'Unexpected error occurred',
            details: error.details || undefined,
        });
    }
}

export default listAbl;
