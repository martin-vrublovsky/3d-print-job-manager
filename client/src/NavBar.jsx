import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <ul>
          <li>
            <h2 onClick={() => navigate('')} style={{ cursor: 'pointer' }}>
              3DPrintJobManager
            </h2>
          </li>

          <li>
            <a onClick={() => navigate('')} style={{ cursor: 'pointer' }}>
              Dashboard
            </a>
          </li>

          <li>
            <a
              onClick={() => navigate('/states')}
              style={{ cursor: 'pointer' }}
            >
              States
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
