import { useState, useEffect } from 'react';
import { StateContext } from './StateContext';

const StateProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  console.log(status);

  useEffect(() => {
    const fetchStates = async () => {
      setStatus('loading...');

      try {
        const res = await fetch('/state/list');

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

    fetchStates();
  }, []);

  return (
    <>
      <StateContext.Provider value={{ data, status, error }}>
        {children}
      </StateContext.Provider>
    </>
  );
};

export default StateProvider;
