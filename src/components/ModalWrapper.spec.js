import React from 'react';
import { shallow } from 'enzyme';
import ModalWrapper from './ModalWrapper';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe('ModalWrapper Component', () => {
   it('renders without crashing', () => {
      shallow(<Provider store={store}>
                <ModalWrapper />    
        </Provider>);
    });
});
