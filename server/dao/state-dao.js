import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stateStorageFolderPath = path.join(__dirname, 'storage', 'state-list');

const create = (stateDtoIn) => {
    const stateList = list();

    if (stateList.some((state) => state.name === stateDtoIn.name)) {
        const error = new Error('State with the given name already exists');
        error.code = 'stateNameAlreadyExists';
        error.status = 409;
        throw error;
    }

    stateDtoIn.id = crypto.randomBytes(16).toString('hex');

    const filePath = path.join(stateStorageFolderPath, `${stateDtoIn.id}.json`);
    const fileData = JSON.stringify(stateDtoIn);

    fs.writeFileSync(filePath, fileData, 'utf-8');

    return stateDtoIn;
}

const list = () => {
    const files = fs.readdirSync(stateStorageFolderPath);

    const stateList = files
        .filter((filename) => filename.endsWith('.json'))
        .map((filename) => {
            const filePath = path.join(stateStorageFolderPath, filename);
            const fileData = fs.readFileSync(filePath, 'utf-8');

            return JSON.parse(fileData);
        });

    return stateList;
}

const get = (id) => {
    try {
        const filePath = path.join(stateStorageFolderPath, `${id}.json`);
        const fileData = fs.readFileSync(filePath, 'utf-8');

        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return null;
        }
    }
}

const update = (stateDtoIn) => {
    const existingState = get(stateDtoIn.id);

    if (!existingState) {
        return null;
    }

    if (stateDtoIn.name && stateDtoIn.name !== existingState.name) {
        const stateList = list();

        if (stateList.some((state) => state.name === stateDtoIn.name)) {
            const error = new Error('State with the given name already exists');
            error.code = 'stateNameAlreadyExists';
            error.status = 409;
            throw error;
        }
    }

    const newState = { ...existingState, ...stateDtoIn };

    if (JSON.stringify(newState) === JSON.stringify(existingState)) {
        return existingState;
    }

    const filePath = path.join(stateStorageFolderPath, `${stateDtoIn.id}.json`);
    const fileData = JSON.stringify(newState);

    fs.writeFileSync(filePath, fileData, 'utf-8');

    return newState;
}

export default {
    create,
    list,
    get,
    update,
};
