import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Icon } from '@mdi/react';
import { mdiPencil, mdiDelete } from '@mdi/js';
import UpdateStateModal from './UpdateStateModal';

const StateItem = ({ data }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <>
      <div className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
        <Card
          className="me-4"
          style={{ width: 'fit-content', backgroundColor: data.colorCode }}
        >
          <Card.Body style={{ padding: '0.35rem 0.7rem' }}>
            <span>{data.name}</span>
          </Card.Body>
        </Card>

        <Button
          onClick={() => setShowUpdateModal(true)}
          className="me-2 pt-1"
          style={{ padding: '0.4rem 0.2rem' }}
        >
          <Icon path={mdiPencil} size={0.9} />
        </Button>

        <Button
          variant="danger"
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
    </>
  );
};

export default StateItem;
