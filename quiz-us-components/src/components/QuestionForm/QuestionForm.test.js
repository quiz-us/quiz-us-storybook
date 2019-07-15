import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import QuestionForm from './QuestionForm';

jest.mock('slate-plain-serializer', () => {
  return {
    serialize: inputVal => {
      return inputVal;
    }
  };
});

// mock QuestionAndAnswers component because the RichTextEditor
// it renders depends on window functions that don't exist in test context:
jest.mock('./QuestionAndAnswers.js', () => ({ updateParentQuestion }) => {
  function handleChange(event) {
    updateParentQuestion(event.target.value);
  }
  return <input onChange={handleChange} data-testid="question-rich-editor" />;
});

jest.mock('./TagsForm', () => ({ updateTags }) => {
  function handleChange(event) {
    updateTags(event.target.value);
  }
  return <input onChange={handleChange} data-testid="tags-form" />;
});

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
  const fetchTags = jest.fn();

  let getByTestId, getByText;
  beforeEach(() => {
    ({ getByTestId, getByText } = render(
      <QuestionForm
        onSubmit={onSubmit}
        standards={standards}
        questionTypes={questionTypes}
        fetchTags={fetchTags}
      />
    ));
  });
  afterEach(cleanup);
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

  describe('submitting question form', () => {
    test('renders error modal if required fields are not filled', () => {
      fireEvent.click(getByTestId('submit-button'));
      expect(getByText('Please fill out all fields!')).toBeTruthy();
      expect(onSubmit).not.toHaveBeenCalled();
    });
    test('calls onSubmit when submitting if all validations pass', () => {
      fireEvent.change(getByTestId('questionType-select'), {
        target: { name: 'questionType', value: 'Multiple Choice' }
      });
      fireEvent.change(getByTestId('standard-select'), {
        target: { name: 'standard', value: 1 }
      });
      fireEvent.change(getByTestId('tags-form'), {
        target: { value: ['dummy tag'] }
      });
      fireEvent.change(getByTestId('question-rich-editor'), {
        target: {
          value: 'dummy content'
        }
      });

      fireEvent.click(getByTestId('submit-button'));

      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
