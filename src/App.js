import React from 'react';
import LandingWrapper from './components/LandingWrapper';
import { Container } from 'semantic-ui-react';

const App = () => {
  return (
    <div>
      <Container style={{background: "white"}}>   
        <LandingWrapper />
      </Container>
    </div>
  );
}

export default App;
