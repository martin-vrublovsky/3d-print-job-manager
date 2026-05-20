import { useContext } from 'react';
import { StateContext } from './StateContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Error from '../../common/Error';

const DeleteStateConfirmationModal = ({
  showDeleteConfirmationModal,
  setShowDeleteConfirmationModal,
  stateData,
}) => {
  const { error, setError, handleMap } = useContext(StateContext);

  const handleClose = () => {
    setShowDeleteConfirmationModal(false);
    setError(null);
  };

  const handleDelete = async () => {
    const isDeleted = await handleMap.handleDelete(stateData.id);

    if (isDeleted) {
      handleClose();
    }
  };

  return (
    <Modal show={showDeleteConfirmationModal} onHide={handleClose} centered>
      <Modal.Header closeButton className="px-4">
        <Modal.Title>Delete state</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4">
        {error && <Error message={error} />}

        <p className="mb-0">
          Are you sure you want to delete state{' '}
          <strong>{stateData?.name}</strong>?
        </p>
      </Modal.Body>

      <Modal.Footer className="px-4">
        <Button variant="secondary" onClick={handleClose} className="me-2">
          Cancel
        </Button>

        <Button variant="danger" onClick={handleDelete} className="fw-semibold">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteStateConfirmationModal;
