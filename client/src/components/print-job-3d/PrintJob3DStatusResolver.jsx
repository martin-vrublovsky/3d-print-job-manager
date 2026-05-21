import { useContext } from 'react';
import { PrintJob3DContext } from './PrintJob3DContext';

import PrintJob3DList from './PrintJob3DList';
import Loading from '../../common/Loading';
import Error from '../../common/Error';

const PrintJob3DStatusResolver = () => {
  const { data, status, error } = useContext(PrintJob3DContext);

  if (data) {
    return <PrintJob3DList />;
  }

  if (status === 'loading...' && !data) {
    return (
      <>
        <div className="position-relative d-flex justify-content-center align-items-center vh-100">
          <div className="position-absolute">
            <Loading size={8} spin={6} />
          </div>

          <div className="position-absolute">
            <Loading size={6} spin={4} />
          </div>

          <div className="position-absolute">
            <Loading size={4} spin={2} />
          </div>
        </div>
      </>
    );
  }

  if (status === 'error' && !data) {
    return <Error message={error} />;
  }
};

export default PrintJob3DStatusResolver;
