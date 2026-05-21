import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Icon } from '@mdi/react';
import { mdiEye, mdiPencil, mdiDelete } from '@mdi/js';

const PrintJob3DItem = ({ data, state }) => {
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
                  width: '8.5rem',
                  marginTop: '-0.4rem',
                  backgroundColor: state.colorCode,
                  // @FIXME border: `2px solid ${state.colorCode}`,
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
                className="pt-1 mt-3 me-2 ms-5"
                style={{ padding: '0.4rem 0.2rem' }}
              >
                <Icon path={mdiEye} size={0.9} />
              </Button>

              <Button
                className="pt-1 mt-3 me-2"
                style={{ padding: '0.4rem 0.2rem' }}
              >
                <Icon path={mdiPencil} size={0.9} />
              </Button>

              <Button
                variant="danger"
                className="pt-1 mt-3"
                style={{ padding: '0.4rem 0.2rem' }}
              >
                <Icon path={mdiDelete} size={0.9} />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default PrintJob3DItem;
