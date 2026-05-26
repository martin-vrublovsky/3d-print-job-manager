import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PrintJob3DDetailModal from './modals/PrintJob3DDetailModal';
import UpdatePrintJob3DModal from './modals/UpdatePrintJob3DModal';
import DeletePrintJob3DConfirmationModal from './modals/DeletePrintJob3DConfirmationModal';

import { Icon } from '@mdi/react';
import { mdiEye, mdiPencil, mdiDelete } from '@mdi/js';

const PrintJob3DListItem = ({ data, state, states }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  return (
    <>
      <Card className="mb-3">
        <Card.Body style={{ padding: '1.3rem 2rem' }}>
          <Row>
            <Col>
              <span className="d-block fw-semibold mb-3">Name</span>
              <span>{data.name}</span>
            </Col>

            <Col>
              <span className="d-block fw-semibold mb-3">Customer Name</span>
              <span>{data.customerName}</span>
            </Col>

            <Col>
              <span className="d-block fw-semibold mb-3">Total Price</span>
              <span>{data.totalPrice} €</span>
            </Col>

            <Col>
              <span className="d-block fw-semibold mb-3">Delivery Due</span>
              <span>{data.deliveryDue}</span>
            </Col>

            <Col>
              <span className="d-block fw-semibold mb-3">State</span>
              <Card
                className="text-center rounded-2"
                style={{
                  width: '8rem',
                  marginTop: '-0.4rem',
                  backgroundColor: state.colorCode,
                }}
              >
                <Card.Body
                  style={{
                    padding: '0.35rem 0.7rem',
                  }}
                >
                  <span>{state.name}</span>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Button
                variant="secondary"
                onClick={() => setShowDetailModal(true)}
                className="pt-1 mt-3 me-2 ms-5"
                style={{ padding: '0.4rem 0.2rem' }}
              >
                <Icon path={mdiEye} size={0.9} />
              </Button>

              <Button
                onClick={() => setShowUpdateModal(true)}
                className="pt-1 mt-3 me-2"
                style={{ padding: '0.4rem 0.2rem' }}
              >
                <Icon path={mdiPencil} size={0.9} />
              </Button>

              <Button
                variant="danger"
                onClick={() => setShowDeleteConfirmationModal(true)}
                className="pt-1 mt-3"
                style={{ padding: '0.4rem 0.2rem' }}
              >
                <Icon path={mdiDelete} size={0.9} />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <PrintJob3DDetailModal
        showDetailModal={showDetailModal}
        setShowDetailModal={setShowDetailModal}
        printJob3DData={data}
      />

      <UpdatePrintJob3DModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        printJob3DData={data}
        states={states}
      />

      <DeletePrintJob3DConfirmationModal
        showDeleteConfirmationModal={showDeleteConfirmationModal}
        setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
        printJob3DData={data}
      />
    </>
  );
};

export default PrintJob3DListItem;
