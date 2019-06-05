import React from 'react';
import { shallow } from 'enzyme';
import QuestionMultipleChoice from './QuestionMultipleChoice';

describe('<QuestionMultipleChoice />', () => {
  it('renders the correct quantity of answers that are passed in', () => {
    const component = (
      <QuestionMultipleChoice
        question="What?"
        answers={[{ text: 'yes' }, { text: 'no' }]}
      />
    );
    const wrapper = shallow(component);
    expect(wrapper.find('Answer').length).toBe(2);
  });
});
