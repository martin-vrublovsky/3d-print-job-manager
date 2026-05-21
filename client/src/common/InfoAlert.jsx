import Alert from 'react-bootstrap/Alert';

import { Icon } from '@mdi/react';
import { mdiInformation } from '@mdi/js';

const InfoAlert = ({ message }) => {
  return (
    <>
      <Alert variant="info">
        <Icon path={mdiInformation} size={1.3} className="text-info me-2" />
        {message}
      </Alert>
    </>
  );
};

export default InfoAlert;
