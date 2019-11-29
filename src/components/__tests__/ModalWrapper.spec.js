import React from 'react';
import { mount } from 'enzyme';
import ModalWrapper from '../ModalWrapper';
import { Provider } from "react-redux";
import reducers from '../../reducers';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const initialState = {
  allTasks: [
      {
          id: "1",
          description: "test1",
          done: true
      },
      {
        id: "2",
        description: "test2",
        done: false
      },
      {
        id: "3",
        description: "test3",
        done: true
      },
  ],
  activeTasks: [
    {
        id: "2",
        description: "test2",
        done: false
    }
  ],
  doneTasks: [
    {
        id: "1",
        description: "test1",
        done: true
    },
    {
        id: "3",
        description: "test3",
        done: true
    }
  ]
}

let wrapped;
let component;
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(ReduxThunk)
);

beforeEach(() => {
  wrapped = mount(
    <Provider store={store}><ModalWrapper /></Provider>
  );
  component = wrapped.find("ModalWrapper").instance();
});

describe('ModalWrapper Component', () => {
    it('renders without crashing', () => {
      expect(wrapped.find("Modal").length).toBe(1);
      wrapped.find("Button").simulate('click');
      expect(component.state.currentMode).toBe('all');
    });
  
    it('should filter active', () => {
      wrapped.find("Button").simulate('click');
      component.setState({currentMode: 'active'});
      expect(wrapped.html()).toContain("test2");
      expect(wrapped.html()).not.toContain("test1");
      expect(wrapped.html()).not.toContain("test3");
    });

    it('should filter done', () => {
      wrapped.find("Button").simulate('click');
      component.setState({currentMode: 'done'});
      expect(wrapped.html()).not.toContain("test2");
      expect(wrapped.html()).toContain("test1");
      expect(wrapped.html()).toContain("test3");
    });
});