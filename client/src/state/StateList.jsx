import { useContext } from 'react';
import { StateContext } from './StateContext';
import StateItem from './StateItem';
import Button from 'react-bootstrap/Button';

const StateList = () => {
  const { data } = useContext(StateContext);

  return (
    <>
      <div className="mb-4" style={{ display: 'flex', alignItems: 'center' }}>
        <h2 className="me-auto">List of states</h2>
        <Button className="fw-semibold" variant="success">
          Create
        </Button>
      </div>

      {data.stateList.length > 0 ? (
        data.stateList.map((state) => <StateItem key={state.id} data={state} />)
      ) : (
        <span>There are no states</span>
      )}
    </>
  );
};

export default StateList;
