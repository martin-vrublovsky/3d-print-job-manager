import { useEffect } from 'react';
import PrintJob3DProvider from './PrintJob3DProvider';
import PrintJob3DStatusResolver from './PrintJob3DStatusResolver';

import Container from 'react-bootstrap/Container';

const Dashboard = () => {
  useEffect(() => {
    document.title = '3DPrintJobManager';
  }, []);

  return (
    <>
      <PrintJob3DProvider>
        <Container>
          <PrintJob3DStatusResolver />
        </Container>
      </PrintJob3DProvider>
    </>
  );
};

export default Dashboard;
