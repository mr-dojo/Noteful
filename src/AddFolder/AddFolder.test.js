import React from 'react';
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom'
import AddFolder from './AddFolder';

describe(`AddFolder component`, () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <AddFolder />
      , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

//__________________Add more tests to AddFolder.test.js_________________________