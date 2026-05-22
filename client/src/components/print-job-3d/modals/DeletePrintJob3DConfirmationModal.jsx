import { useContext } from 'react';
import { PrintJob3DContext } from '../PrintJob3DContext';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Error from '../../../common/Error';

const DeletePrintJob3DConfirmationModal = ({
  showDeleteConfirmationModal,
  setShowDeleteConfirmationModal,
  printJob3DData,
}) => {
  const { error, setError, handleMap } = useContext(PrintJob3DContext);

  const handleClose = () => {
    setShowDeleteConfirmationModal(false);
    setError(null);
  };

  const handleDelete = async () => {
    const isDeleted = await handleMap.handleDelete(printJob3DData.id);

    if (isDeleted) {
      handleClose();
    }
  };

  return (
    <Modal show={showDeleteConfirmationModal} onHide={handleClose} centered>
      <Modal.Header className="px-4" closeButton>
        <Modal.Title>Delete 3D printing job</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4">
        {error && <Error message={error} />}

        <p className="mb-0">
          Are you sure you want to delete 3D printing job{' '}
          <strong>{printJob3DData?.name}</strong>?
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

export default DeletePrintJob3DConfirmationModal;
