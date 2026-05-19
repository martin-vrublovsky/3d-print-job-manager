import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
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
