import React, { useReducer } from 'react';
import crypto from 'crypto';

const generateAnswerId = () => crypto.randomBytes(20).toString('hex');

let reducer = (state, action) => {
  const { type, name, value } = action;
  switch (type) {
    case 'update':
      return { ...state, [name]: value };
    case 'addAnswerChoice':
      return {
        ...state,
        answers: [
          ...state.answers,
          { value: undefined, answerId: generateAnswerId() }
        ]
      };
    default:
      return;
  }
};
const initialState = {
  questionType: '',
  standard: '',
  tags: [],
  question: {},
  answers: [{ value: undefined, answerId: generateAnswerId() }]
};
const QuestionFormContext = React.createContext(initialState);

function QuestionFormProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QuestionFormContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionFormContext.Provider>
  );
}
export { QuestionFormContext, QuestionFormProvider };
