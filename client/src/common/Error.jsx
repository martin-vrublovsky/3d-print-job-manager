import Alert from 'react-bootstrap/Alert';
import { Icon } from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';

const Error = ({ message }) => {
  return (
    <>
      <Alert variant="danger">
        <Icon path={mdiAlertCircle} size={1.3} className="text-danger me-2" />
        {message}
      </Alert>
    </>
  );
};

export default Error;
