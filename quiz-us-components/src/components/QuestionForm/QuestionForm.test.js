import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from '@testing-library/react';
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
        {children.map(({ props: { value } }) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  }
);

describe('<QuestionForm />', () => {
  const questionTypes = ['Multiple Choice', 'Free Response'];
  const { getByTestId, getByText, debug } = render(
    <QuestionForm
      standards={[{ id: 1, name: '1' }, { id: 2, name: '2' }]}
      questionTypes={questionTypes}
    />
  );
  test('can choose a question type', async () => {
    questionTypes.forEach(questionType => {
      fireEvent.change(getByTestId('questionType-select'), {
        target: { name: 'questionType', value: questionType }
      });
      expect(getByText(questionType)).toBeTruthy();
    });
  });
});
