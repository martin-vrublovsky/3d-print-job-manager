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
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
          }}
        >
          <div style={{ position: 'absolute' }}>
            <Loading size={7} spin={4} />
          </div>

          <div style={{ position: 'absolute' }}>
            <Loading size={6} spin={2} />
          </div>

          <div style={{ position: 'absolute' }}>
            <Loading size={9} spin={6} />
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
