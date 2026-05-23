import { useContext, useState } from 'react';
import { PrintJob3DContext } from './PrintJob3DContext';

import PrintJob3DListItem from './PrintJob3DListItem';
import InfoAlert from '../../common/InfoAlert';
import Button from 'react-bootstrap/Button';
import CreatePrintJob3DModal from './modals/CreatePrintJob3DModal';

const PrintJob3DList = () => {
  const { data } = useContext(PrintJob3DContext);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const groupedAndSortedList = data?.printJob3DGroupedAndSortedList || {};

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <h2 className="me-auto">List of 3D printing jobs</h2>

        <Button
          variant="success"
          onClick={() => setShowCreateModal(true)}
          className="fw-semibold"
        >
          Create
        </Button>
      </div>

      <hr className="my-1 mb-4"></hr>

      {Object.keys(groupedAndSortedList).length > 0 ? (
        Object.entries(groupedAndSortedList)
          .sort(([a], [b]) => new Date(a) - new Date(b))
          .map(([deliveryDate, printJobs3D]) => (
            <span key={deliveryDate}>
              <h5 className="mb-3">{deliveryDate}</h5>

              {printJobs3D.map((printJob3D) => (
                <PrintJob3DListItem
                  key={printJob3D.id}
                  data={printJob3D}
                  state={data.stateMap[printJob3D.stateId]}
                  states={Object.values(data.stateMap)}
                />
              ))}
            </span>
          ))
      ) : (
        <InfoAlert
          message={
            'No 3D printing job has been created yet. You must create one first.'
          }
        ></InfoAlert>
      )}

      <CreatePrintJob3DModal
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        states={Object.values(data.stateMap)}
      />
    </>
  );
};

export default PrintJob3DList;
