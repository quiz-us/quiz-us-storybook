import React from 'react';
import { mount } from 'enzyme';
import QuestionMultipleChoice from './QuestionMultipleChoice';

describe('<QuestionMultipleChoice />', () => {
  it('renders the correct quantity of answers that are passed in', () => {
    const component = (
      <QuestionMultipleChoice
        question="What?"
        answers={[{ text: 'yes' }, { text: 'no' }]}
      />
    );
    const wrapper = mount(component);
    // Note: using styled-components API for material-ui styling causes
    // additional complexity when testing these react components since
    // everything is wrapped by `withStyles` HOCs
    // example:
    // console.log(wrapper.debug())
    expect(wrapper.find('Button').length).toBe(2);
  });
});
