import { useContext, useState } from 'react';
import { StateContext } from './StateContext';

import StateItem from './StateItem';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CreateStateModal from './modals/CreateStateModal';

import { Icon } from '@mdi/react';
import { mdiInformation } from '@mdi/js';

const StateList = () => {
  const { data } = useContext(StateContext);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <h2 className="me-auto">List of states</h2>

        <Button
          variant="success"
          onClick={() => setShowCreateModal(true)}
          className="fw-semibold"
        >
          Create
        </Button>
      </div>

      <hr className="my-1 mb-4"></hr>

      {data?.stateList?.length > 0 ? (
        data.stateList.map((state) => <StateItem key={state.id} data={state} />)
      ) : (
        <Alert variant="info">
          <Icon path={mdiInformation} size={1.3} className="text-info me-2" />
          No state has been created yet. You must create one first.
        </Alert>
      )}

      <CreateStateModal
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
      />
    </>
  );
};

export default StateList;
