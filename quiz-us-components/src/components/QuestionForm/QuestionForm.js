import React from 'react';
import { QuestionFormProvider } from './QuestionFormContext';
import Form from './Form';

const QuestionForm = props => {
  return (
    <QuestionFormProvider>
      <Form {...props} />
    </QuestionFormProvider>
  );
};

export default QuestionForm;
