import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import QuestionAndAnswers from './QuestionAndAnswers';

jest.mock('../../index', () => ({
  RichTextEditor: () => (
    <div>
      Rich Text Editor
      <textarea />
    </div>
  )
}));

describe('<QuestionAndAnswers />', () => {
  let getAllByText, getByTitle;
  const mockUpdateParentQuestion = jest.fn();
  const mockUpdateParentAnswers = jest.fn();
  afterEach(cleanup);
  describe("when question type is 'Multiple Choice'", () => {
    const questionType = 'Multiple Choice';
    test("renders deleteable answer if question type is 'Multiple Choice'", () => {
      ({ getByTitle, getAllByText } = render(
        <QuestionAndAnswers
          questionType={questionType}
          classes={{}}
          updateParentAnswers={mockUpdateParentAnswers}
          updateParentQuestion={mockUpdateParentQuestion}
        />
      ));

      expect(getAllByText('Rich Text Editor').length).toBe(2);
      fireEvent.click(getByTitle('delete answer'));
      expect(getAllByText('Rich Text Editor').length).toBe(1);
    });
    test('able to add answer choice', () => {
      ({ getByTitle, getAllByText } = render(
        <QuestionAndAnswers
          questionType={questionType}
          classes={{}}
          updateParentAnswers={mockUpdateParentAnswers}
          updateParentQuestion={mockUpdateParentQuestion}
        />
      ));

      expect(getAllByText('Rich Text Editor').length).toBe(2);
      fireEvent.click(getByTitle('add answer'));
      expect(getAllByText('Rich Text Editor').length).toBe(3);
    });
  });
});
