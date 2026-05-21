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

  const handleCreate = async (payload) => {
    setStatus('creating');
    setError(null);

    try {
      const res = await fetch('/print-job-3d/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.details?.[0]?.message || data?.message);
      }

      setData((currentData) => {
        if (!currentData) return currentData;

        const deliveryDate = data.deliveryDue;

        const currentGroup =
          currentData.printJob3DGroupedAndSortedList[deliveryDate] || [];

        return {
          ...currentData,
          printJob3DGroupedAndSortedList: {
            ...currentData.printJob3DGroupedAndSortedList,
            [deliveryDate]: [...currentGroup, data],
          },
        };
      });

      setStatus('success');

      return true;
    } catch (error) {
      setError(error.message);
      setStatus('error');

      return false;
    }
  };

  return (
    <>
      <PrintJob3DContext.Provider
        value={{ data, status, error, setError, handleMap: { handleCreate } }}
      >
        {children}
      </PrintJob3DContext.Provider>
    </>
  );
};

export default PrintJob3DProvider;
