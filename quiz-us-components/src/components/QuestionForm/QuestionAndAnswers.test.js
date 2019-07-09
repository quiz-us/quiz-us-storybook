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
  let getAllByText, debug;
  const mockUpdateParentQuestion = jest.fn();
  const mockUpdateParentAnswers = jest.fn();
  afterEach(cleanup);
  test("renders deleteable answer if question type is 'Multiple Choice'", () => {
    ({ getAllByText } = render(
      <QuestionAndAnswers
        questionType="Multiple Choice"
        classes={{}}
        updateParentAnswers={mockUpdateParentAnswers}
        updateParentQuestion={mockUpdateParentQuestion}
      />
    ));

    // find the delete icon and delete the answer choice possibility
    // perhaps you can discern between question and answer RichTextEditor based
    // on the function being passed to updateParentState;
  });
});
