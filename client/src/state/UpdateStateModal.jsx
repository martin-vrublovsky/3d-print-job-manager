import { useContext, useState, useEffect } from 'react';
import { StateContext } from './StateContext';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Error from '../common/Error';

const UpdateStateModal = ({
  showUpdateModal,
  setShowUpdateModal,
  stateData,
}) => {
  const { error, setError, handleMap } = useContext(StateContext);

  const [name, setName] = useState('');
  const [colorCode, setColorCode] = useState('');

  const handleClose = () => {
    setShowUpdateModal(false);
    setError(null);
  };

  useEffect(() => {
    if (showUpdateModal && stateData) {
      setName(stateData.name || '');
      setColorCode(stateData.colorCode || '');
    }
  }, [showUpdateModal, stateData]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const success = await handleMap.handleUpdate(stateData.id, name, colorCode);

    if (success) {
      handleClose();
    }
  };

  return (
    <Modal show={showUpdateModal} onHide={handleClose} centered>
      <Form onSubmit={onSubmit}>
        <Modal.Header className="px-4" closeButton>
          <Modal.Title>Update state</Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4">
          {error && <Error message={error} />}

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="fw-semibold">Color code (hex)</Form.Label>
            <Form.Control
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
            />
            <small>(if not set, the default color #F4F4F4 is used)</small>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="px-4">
          <Button variant="secondary" onClick={handleClose} className="me-2">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="fw-semibold">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateStateModal;
