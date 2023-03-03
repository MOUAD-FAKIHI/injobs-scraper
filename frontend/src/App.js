import SearchScreen from './screens/SearchScreen';
import JobsListSceen from './screens/JobsListSceen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar } from 'react-bootstrap';
import injobs from './assets/logos/injobslogo.png';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand href="#home">
                <img
                  width="80px"
                  height="auto"
                  src={injobs}
                  className="img-responsive"
                  alt="injobs logo"
                />
              </Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container fluid className="p-5">
          <Routes>
            <Route path="/" element={<SearchScreen />} />
            <Route path="/jobslist/:jobtitle/:location" element={<JobsListSceen />} />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
