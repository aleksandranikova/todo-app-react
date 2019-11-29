import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import DragAndDropWrapper from './DragDropWrapper';

const mockStore = configureMockStore();
const store = mockStore({});

describe('DragAndDropWrapper Component', () => {
   it('renders without crashing', () => {
      shallow(<Provider store={store}>
                <DragAndDropWrapper />    
            </Provider>);
    });
});