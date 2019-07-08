import React from 'react';
import { render, cleanup } from '@testing-library/react';
import QuestionMultipleChoice from './QuestionMultipleChoice';

describe('<QuestionMultipleChoice />', () => {
  afterEach(cleanup);
  test('renders the answer choices that are passed in', () => {
    const component = (
      <QuestionMultipleChoice
        question="What?"
        answers={[
          { text: 'First Multiple Choice' },
          { text: 'Second Multiple Choice' }
        ]}
      />
    );
    const { getByText } = render(component);

    expect(getByText('First Multiple Choice')).toBeTruthy();
    expect(getByText('Second Multiple Choice')).toBeTruthy();
  });
});
