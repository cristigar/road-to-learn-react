import Enzyme, { shallow } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import React from 'react';

import Table from './index';

Enzyme.configure({adapter: new Adapter()});

describe('Table', () => {
  const props = {
    list: [
      {title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y', url: 'url1'},
      {title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z', url: 'url2'},
    ],
    onDismiss: () => {
    },
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Table {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows 2 items in the list', () => {
    const element = shallow(<Table {...props} />);
    expect(element.find('.table-row').length).toBe(2);
  });
});
