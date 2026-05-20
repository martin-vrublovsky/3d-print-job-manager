import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                style={{
                  width: '8.5rem',
                  backgroundColor: state.colorCode,
                  textAlign: 'center',
                  marginTop: '-0.4rem',
                  // @FIXME border: `2px solid ${state.colorCode}`,
                  borderRadius: '0.5rem',
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
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default PrintJob3DItem;
