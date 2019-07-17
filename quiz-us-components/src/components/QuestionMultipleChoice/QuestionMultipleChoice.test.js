import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import QuestionMultipleChoice from './QuestionMultipleChoice';

describe('<QuestionMultipleChoice />', () => {
  let getByText, getByTestId, queryByTestId;
  beforeEach(() => {
    const component = (
      <QuestionMultipleChoice
        question="What?"
        answers={[
          { text: 'First Multiple Choice' },
          { text: 'Second Multiple Choice' },
          { text: 'Correct Choice', correct: true }
        ]}
      />
    );
    ({ getByText, getByTestId, queryByTestId } = render(component));
  });
  afterEach(cleanup);

  test('renders the answer choices that are passed in', () => {
    expect(getByText('First Multiple Choice')).toBeTruthy();
    expect(getByText('Second Multiple Choice')).toBeTruthy();
    expect(getByText('Correct Choice')).toBeTruthy();
  });

  test('indicates when chosen answer is correct', () => {
    fireEvent.click(getByText('Correct Choice'));
    expect(getByTestId('correct-icon')).toBeTruthy();
    // https://stackoverflow.com/a/52783201:
    expect(queryByTestId('incorrect-icon')).toBeNull();
  });

  test('indicates when chosen answer is incorrect', () => {
    fireEvent.click(getByText('First Multiple Choice'));
    expect(getByTestId('incorrect-icon')).toBeTruthy();
    expect(getByTestId('correct-icon')).toBeTruthy();
  });
});
