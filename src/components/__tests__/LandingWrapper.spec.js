import React from 'react';
import { mount } from 'enzyme';
import LandingWrapper from '../LandingWrapper';
import { Provider } from "react-redux";
import reducers from '../../reducers';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const initialState = {
  allTasks: [],
  activeTasks: [],
  doneTasks: []
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
    <Provider store={store}><LandingWrapper /></Provider>
  );
  component = wrapped.find("LandingWrapper").instance();
});

describe('LandingWrapper Component', () => {
    it('renders without crashing', () => {
      expect(wrapped.find("Header").length).toBe(1);
      expect(wrapped.find("DragDropWrapper").length).toBe(1);
      expect(wrapped.find("Progress").length).toBe(1);
      expect(wrapped.find("Divider").length).toBe(1);
      expect(wrapped.find("ModalWrapper").length).toBe(1);
    });

    it('should add a task', () => {
      component.setState({currentTask: "test"});
      component.addTask(); 
      expect(component.props['allTasks'].length).toBe(1);   
      expect(component.props['activeTasks'].length).toBe(1);   
      expect(component.props['doneTasks'].length).toBe(0);   
    });

    it('should edit a task', () => {
      component.setState({currentTask: "test2"});
      component.addTask(); 
      expect(component.props['allTasks'].length).toBe(2);   
      expect(component.props['activeTasks'].length).toBe(2);   
      expect(component.props['doneTasks'].length).toBe(0);   
      component.props['selectTask'](component.props['allTasks'][0]);
      component.setState({currentTask: "test3"});
      component.addTask();
      expect(component.props['allTasks'].length).toBe(2);   
      expect(component.props['activeTasks'].length).toBe(2);   
      expect(component.props['doneTasks'].length).toBe(0);  
      expect(component.props['allTasks'][0].description).toEqual("test3");    
    });

    it('should move all tasks to done', () => {
      component.setState({currentTask: "test1"});
      component.addTask(); 
      component.setState({currentTask: "test2"});
      component.addTask(); 
      component.setState({currentTask: "test3"});
      component.addTask(); 
      expect(component.props['allTasks'].length).toBe(5);   
      expect(component.props['activeTasks'].length).toBe(5);   
      expect(component.props['doneTasks'].length).toBe(0);
      component.markAllAsDone();   
      expect(component.props['allTasks'].length).toBe(5);   
      expect(component.props['activeTasks'].length).toBe(0);   
      expect(component.props['doneTasks'].length).toBe(5);
    });
    
});