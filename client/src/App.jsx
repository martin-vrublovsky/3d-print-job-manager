import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './components/print-job-3d/Dashboard';
import States from './components/state/States';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/states" element={<States />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
