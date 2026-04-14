import express from 'express';
import printJob3DController from './controllers/print-job-3d-controller.js';
import stateController from './controllers/state-controller.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Test');
});

app.use('/print-job-3d', printJob3DController);
app.use('/state', stateController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
