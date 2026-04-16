import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const printJob3DStorageFolderPath = path.join(__dirname, 'storage', 'print-job-3d-list');

const create = (printJob3DDtoIn) => {
    const printJob3DList = list();

    if (printJob3DList.some((printJob3D) =>
        printJob3D.name === printJob3DDtoIn.name &&
        printJob3D.customerName === printJob3DDtoIn.customerName &&
        new Date(printJob3D.deliveryDue).setHours(0, 0, 0, 0) === new Date(printJob3DDtoIn.deliveryDue).setHours(0, 0, 0, 0))) {
            const error = new Error('A similar 3D print job with the same name, customer name and delivery due date already exists');
            error.code = 'similar3DPrintJobAlreadyExists';
            error.status = 409;
            throw error;
    }

    printJob3DDtoIn.id = crypto.randomBytes(16).toString('hex');

    const filePath = path.join(printJob3DStorageFolderPath, `${printJob3DDtoIn.id}.json`);
    const fileData = JSON.stringify(printJob3DDtoIn);

    fs.writeFileSync(filePath, fileData, 'utf-8');

    return printJob3DDtoIn;
}

const list = () => {
    const files = fs.readdirSync(printJob3DStorageFolderPath);

    const printJob3DList = files
        .filter((filename) => filename.endsWith('.json'))
        .map((filename) => {
            const filePath = path.join(printJob3DStorageFolderPath, filename);
            const fileData = fs.readFileSync(filePath, 'utf-8');

            return JSON.parse(fileData);
        });

    return printJob3DList;
}

const get = (id) => {
    try {
        const filePath = path.join(printJob3DStorageFolderPath, `${id}.json`);
        const fileData = fs.readFileSync(filePath, 'utf-8');

        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return null;
        }
    }
}

export default {
    create,
    list,
    get,
};
