import StateProvider from './StateProvider';
import StateStatusResolver from './StateStatusResolver';
import Container from 'react-bootstrap/Container';

const States = () => {
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
