import { useContext } from 'react';
import { StateContext } from './StateContext';
import StateList from './StateList';
import Loading from '../../common/Loading';
import Error from '../../common/Error';

const StateStatusResolver = () => {
  const { data, status, error } = useContext(StateContext);

  if (data) {
    return <StateList />;
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

export default StateStatusResolver;
