import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {shallow} from "enzyme/build";
import React from "react";
import Enzyme from "enzyme/build";
import Adapter from 'enzyme-adapter-react-16';

import Button from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Give me more...</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Button>Give me more...</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('is displayed correctly', () => {
    const element = shallow(<Button>Button text</Button>);
    expect(element.text()).toBe('Button text');
  });
});
