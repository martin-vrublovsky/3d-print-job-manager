import { useState, useEffect } from 'react';
import { StateContext } from './StateContext';

const StateProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  console.log(status);

  const getValidationMessage = (data) => {
    const keyPath = data?.details?.[0]?.instancePath;

    const keyName = keyPath
      ?.replace('/', '')
      ?.replace(/^\w/, (c) => c.toUpperCase());

    return data?.details?.[0]
      ? `${keyName} ${data.details[0].message}`
      : data?.message;
  };

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

  useEffect(() => {
    fetchStates();
  }, []);

  const handleCreate = async (name, colorCode) => {
    setStatus('creating');
    setError(null);

    try {
      const res = await fetch('/state/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, colorCode }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(getValidationMessage(data));
      }

      setData((currentData) => {
        if (!currentData) return currentData;

        return {
          ...currentData,
          stateList: [...currentData.stateList, data],
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

  const handleUpdate = async (id, name, colorCode) => {
    setStatus(`updating ${id}`);
    setError(null);

    try {
      const res = await fetch('/state/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, colorCode }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(getValidationMessage(data));
      }

      setData((currentData) => {
        if (!currentData) return currentData;

        return {
          ...currentData,
          stateList: currentData.stateList.map((state) =>
            state.id === id ? data : state
          ),
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

  const handleDelete = async (id) => {
    setStatus(`deleting ${id}`);
    setError(null);

    try {
      const res = await fetch('/state/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(getValidationMessage(data));
      }

      setData((currentData) => ({
        ...currentData,
        stateList: currentData.stateList.filter((state) => state.id !== id),
      }));

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
      <StateContext.Provider
        value={{
          data,
          status,
          error,
          setError,
          handleMap: { handleCreate, handleUpdate, handleDelete },
        }}
      >
        {children}
      </StateContext.Provider>
    </>
  );
};

export default StateProvider;
