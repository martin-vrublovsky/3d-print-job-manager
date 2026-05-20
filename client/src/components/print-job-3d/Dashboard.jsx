import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    document.title = '3DPrintJobManager';
  }, []);

  return (
    <>
      <h1>Dashboard page</h1>
    </>
  );
};

export default Dashboard;
