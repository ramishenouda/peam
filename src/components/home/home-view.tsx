import { Container } from 'react-bootstrap';
import './home-style.css';

interface Props {
  name: string;
}

function Home(props: Props): JSX.Element {
  return (
    <>
      <Container fluid id="home">
        <div className="text-center no-select">PEAM</div>
      </Container>
    </>
  );
}

export default Home;
