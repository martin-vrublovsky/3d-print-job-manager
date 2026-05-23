import { useContext } from 'react';
import { PrintJob3DContext } from '../PrintJob3DContext';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Error from '../../../common/Error';

const PrintJob3DDetailModal = ({
  showDetailModal,
  setShowDetailModal,
  printJob3DData,
}) => {
  const { error, setError } = useContext(PrintJob3DContext);

  const handleClose = () => {
    setShowDetailModal(false);
    setError(null);
  };

  return (
    <Modal show={showDetailModal} onHide={handleClose} centered>
      <Modal.Header className="px-4" closeButton>
        <Modal.Title>Additional information about 3D printing job</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4">
        {error && <Error message={error} />}

        <span className="fw-semibold">Filament Code Name</span>
        <p className={!printJob3DData?.note ? 'mb-0' : ''}>
          {printJob3DData.filamentCodeName}
        </p>

        {printJob3DData?.note && (
          <>
            <span className="fw-semibold">Note</span>
            <p className="mb-0">{printJob3DData.note}</p>
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="px-4">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrintJob3DDetailModal;
