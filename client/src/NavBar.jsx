import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import { Icon } from '@mdi/react';
import { mdiPrinter3d } from '@mdi/js';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            onClick={() => navigate('/')}
            className="d-flex"
            style={{ cursor: 'pointer' }}
          >
            <Icon path={mdiPrinter3d} size={1.3} className="me-2" />
            <h4>3DPrintJobManager</h4>
          </Navbar.Brand>

          <Nav variant="underline">
            <Nav.Item>
              <Nav.Link
                onClick={() => navigate('/')}
                active={location.pathname === '/'}
              >
                Dashboard
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                onClick={() => navigate('/states')}
                active={location.pathname === '/states'}
              >
                States
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
