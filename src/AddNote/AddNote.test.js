import React from 'react';
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
import AddNote from './AddNote'
import ReactDOM from 'react-dom'

describe(`AddNote component`, () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <AddNote />
      , div);
    ReactDOM.unmountComponentAtNode(div);
  });

  //_______________Add more tests to AddNote.test.js___________________

  // it('renders a AddNote by default', () => {
  //   const wrapper = shallow(<AddNote />)
  //   expect(toJson(wrapper)).toMatchSnapshot()
  // })
})