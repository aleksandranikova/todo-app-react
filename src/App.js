import React from 'react';
import LandingWrapper from './components/LandingWrapper';
import { Menu, Container } from 'semantic-ui-react';

const App = () => {
  return (
    <div className="App">
      <Container>
      <Menu stackable color="teal" inverted>
          <Menu.Item
              name='todo'><a href="/">To Do App</a></Menu.Item>          
          </Menu>      
      <LandingWrapper />
      </Container>
    </div>
  );
}

export default App;
