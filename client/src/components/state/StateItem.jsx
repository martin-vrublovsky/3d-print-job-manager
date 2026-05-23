import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UpdateStateModal from './modals/UpdateStateModal';
import DeleteStateConfirmationModal from './modals/DeleteStateConfirmationModal';

import { Icon } from '@mdi/react';
import { mdiPencil, mdiDelete } from '@mdi/js';

const StateItem = ({ data }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <Card
          className="me-auto text-center"
          style={{ width: '8rem', backgroundColor: data.colorCode }}
        >
          <Card.Body style={{ padding: '0.35rem 0.7rem' }}>
            <span>{data.name}</span>
          </Card.Body>
        </Card>

        <Button
          onClick={() => setShowUpdateModal(true)}
          className="pt-1 me-2"
          style={{ padding: '0.4rem 0.2rem' }}
        >
          <Icon path={mdiPencil} size={0.9} />
        </Button>

        <Button
          variant="danger"
          onClick={() => setShowDeleteConfirmationModal(true)}
          className="pt-1"
          style={{ padding: '0.4rem 0.2rem' }}
        >
          <Icon path={mdiDelete} size={0.9} />
        </Button>
      </div>

      <UpdateStateModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        stateData={data}
      />

      <DeleteStateConfirmationModal
        showDeleteConfirmationModal={showDeleteConfirmationModal}
        setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
        stateData={data}
      />
    </>
  );
};

export default StateItem;
