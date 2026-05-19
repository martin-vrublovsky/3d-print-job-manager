import { Icon } from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';

const Error = ({ message }) => {
  return (
    <>
      <Icon path={mdiAlertCircle} size={10} color={'red'} />
      {message}
    </>
  );
};

export default Error;
