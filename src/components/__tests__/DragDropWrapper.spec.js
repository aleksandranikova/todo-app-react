import React from 'react';
import { mount } from 'enzyme';
import DragDropWrapper from '../DragDropWrapper';
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
    <Provider store={store}><DragDropWrapper /></Provider>
  );
  component = wrapped.find("DragDropWrapper").instance();
});

describe('DragDropWrapper Component', () => {
    it('renders without crashing', () => {
      expect(wrapped.find("DragDropWrapper").length).toBe(1);
    });

    it('should remove task', () => {
        expect(component.props['doneItems'].length).toBe(2);
        let task = {
            id: "3",
            description: "test3",
            done: true
          }
       component.removeTask(task);
       expect(component.props['doneItems'].length).toBe(1);
    });
    
});