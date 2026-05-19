import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Icon } from '@mdi/react';
import { mdiPencil } from '@mdi/js';
import { mdiDelete } from '@mdi/js';

const StateItem = ({ data }) => {
  return (
    <>
      <div className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
        <Card
          className="me-4"
          style={{ width: 'fit-content', backgroundColor: data.colorCode }}
        >
          <Card.Body style={{ padding: '0.5rem 0.75rem' }}>
            <span>{data.name}</span>
          </Card.Body>
        </Card>

        <Button className="me-2" style={{ padding: '0.25rem 0.15rem' }}>
          <Icon path={mdiPencil} size={0.9} />
        </Button>

        <Button variant="danger" style={{ padding: '0.25rem 0.15rem' }}>
          <Icon path={mdiDelete} size={0.9} />
        </Button>
      </div>
    </>
  );
};

export default StateItem;
