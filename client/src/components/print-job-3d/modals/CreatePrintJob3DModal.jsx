import { useContext, useState, useEffect } from 'react';
import { PrintJob3DContext } from '../PrintJob3DContext';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Error from '../../../common/Error';

const CreatePrintJob3DModal = ({
  showCreateModal,
  setShowCreateModal,
  states,
}) => {
  const { error, setError, handleMap } = useContext(PrintJob3DContext);

  const [name, setName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [deliveryDue, setDeliveryDue] = useState('');

  const [stateId, setStateId] = useState('');
  const [filamentCodeName, setFilamentCodeName] = useState('');
  const [note, setNote] = useState('');

  const handleClose = () => {
    setShowCreateModal(false);
    setError(null);
  };

  useEffect(() => {
    if (showCreateModal) {
      setName('');
      setCustomerName('');
      setTotalPrice('');
      setDeliveryDue('');

      setStateId('');
      setFilamentCodeName('');
      setNote('');
    }
  }, [showCreateModal]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      customerName,
      totalPrice: Number(totalPrice),
      deliveryDue,
      stateId,
      filamentCodeName,
      note,
    };

    const isCreated = await handleMap.handleCreate(payload);

    if (isCreated) {
      handleClose();
    }
  };

  return (
    <Modal show={showCreateModal} onHide={handleClose} centered size="lg">
      <Form onSubmit={onSubmit}>
        <Modal.Header className="px-4" closeButton>
          <Modal.Title>Create 3D printing job</Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4">
          {error && <Error message={error} />}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Name *</Form.Label>

                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Customer Name *</Form.Label>

                <Form.Control
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Total Price (€) *
                </Form.Label>

                <Form.Control
                  type="number"
                  step="0.01"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Delivery Due *</Form.Label>

                <Form.Control
                  type="date"
                  value={deliveryDue}
                  onChange={(e) => setDeliveryDue(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">State *</Form.Label>

                <Form.Select
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                  required
                >
                  <option value="">Select state</option>

                  {states?.map((state) => (
                    <option
                      key={state.id}
                      value={state.id}
                      style={{ backgroundColor: state.colorCode }}
                    >
                      {state.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Filament Code Name *
                </Form.Label>

                <Form.Control
                  value={filamentCodeName}
                  onChange={(e) => setFilamentCodeName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="fw-semibold">Note</Form.Label>

                <Form.Control
                  as="textarea"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ height: '7.7rem' }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="px-4">
          <Button variant="secondary" onClick={handleClose} className="me-2">
            Cancel
          </Button>

          <Button type="submit" variant="success" className="fw-semibold">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreatePrintJob3DModal;
