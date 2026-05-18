import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import States from './state/States';
import Dashboard from './print-job-3d/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/states" element={<States />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
