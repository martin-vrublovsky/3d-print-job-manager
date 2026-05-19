import { useEffect } from 'react';
import StateProvider from './StateProvider';
import StateStatusResolver from './StateStatusResolver';
import Container from 'react-bootstrap/Container';

const States = () => {
  useEffect(() => {
    document.title = 'States | 3DPrintJobManager';
  }, []);

  return (
    <>
      <StateProvider>
        <Container>
          <StateStatusResolver />
        </Container>
      </StateProvider>
    </>
  );
};

export default States;
