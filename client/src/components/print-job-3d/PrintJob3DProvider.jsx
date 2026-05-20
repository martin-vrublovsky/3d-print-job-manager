import { useState, useEffect } from 'react';
import { PrintJob3DContext } from './PrintJob3DContext';

const PrintJob3DProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  console.log(status);

  useEffect(() => {
    const fetchPrintJobs3D = async () => {
      setStatus('loading...');

      try {
        const res = await fetch('/print-job-3d/list');

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();
        setData(data);
        setStatus('success');
      } catch (error) {
        setError(error.message);
        setStatus('error');
      }
    };

    fetchPrintJobs3D();
  }, []);

  return (
    <>
      <PrintJob3DContext.Provider value={{ data, status, error, setError }}>
        {children}
      </PrintJob3DContext.Provider>
    </>
  );
};

export default PrintJob3DProvider;
