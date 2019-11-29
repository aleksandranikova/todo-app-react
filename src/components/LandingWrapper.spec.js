import React from 'react';
import { shallow } from 'enzyme';
import { LandingWrapper } from './LandingWrapper';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe('LandingWrapper Component', () => {
    it('renders without crashing', () => {
       shallow(<Provider store={store}>
            <LandingWrapper />    
        </Provider>);
      });
});