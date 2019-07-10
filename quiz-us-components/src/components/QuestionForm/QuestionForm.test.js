import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import QuestionForm from './QuestionForm';

// mock QuestionAndAnswers component because the RichTextEditor
// it renders depends on window functions that don't exist in test context:
jest.mock('./QuestionAndAnswers.js', () =>
  jest.fn(() => <div>Mock QuestionsAndAnswers</div>)
);

// https://www.polvara.me/posts/testing-a-custom-select-with-react-testing-library/
jest.mock(
  '@material-ui/core/Select',
  () => ({ children, value, onChange, inputProps }) => {
    function handleChange(event) {
      onChange(event);
    }
    return (
      <select data-testid={inputProps.id} value={value} onChange={handleChange}>
        {children.map(({ props: { children, value } }) => (
          <option key={value} value={value}>
            {children}
          </option>
        ))}
      </select>
    );
  }
);

describe('<QuestionForm />', () => {
  const questionTypes = ['Multiple Choice', 'Free Response'];
  const standards = [
    { id: 1, name: 'Standard 1' },
    { id: 2, name: 'Standard 2' }
  ];
  const onSubmit = jest.fn();
  const { getByTestId, getByText } = render(
    <QuestionForm
      onSubmit={onSubmit}
      standards={standards}
      questionTypes={questionTypes}
    />
  );
  afterAll(cleanup);
  test('can choose a question type', async () => {
    questionTypes.forEach(questionType => {
      fireEvent.change(getByTestId('questionType-select'), {
        target: { name: 'questionType', value: questionType }
      });
      expect(getByText(questionType)).toBeTruthy();
    });
  });

  test('can choose a standard', async () => {
    standards.forEach(({ name, id }) => {
      fireEvent.change(getByTestId('standard-select'), {
        target: { name: 'standard', value: id }
      });
      expect(getByText(name)).toBeTruthy();
    });
  });

  test('calls onSubmit when submitting', () => {
    fireEvent.click(getByTestId('submit-button'));
    expect(onSubmit).toHaveBeenCalled();
  });
});
