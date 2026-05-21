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

export default StateStatusResolver;
