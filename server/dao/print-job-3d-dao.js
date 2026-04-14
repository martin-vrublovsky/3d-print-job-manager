import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const printJob3DStorageFolderPath = path.join(__dirname, 'storage', 'print-job-3d-list');

const create = (printJob3DDtoIn) => {
    printJob3DDtoIn.id = crypto.randomBytes(16).toString('hex');

    const filePath = path.join(printJob3DStorageFolderPath, `${printJob3DDtoIn.id}.json`);
    const fileData = JSON.stringify(printJob3DDtoIn);

    fs.writeFileSync(filePath, fileData, 'utf-8');

    return printJob3DDtoIn;
}

export default {
    create,
};
