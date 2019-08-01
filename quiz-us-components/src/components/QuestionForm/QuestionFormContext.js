import React, { useReducer } from 'react';

let reducer = (state, action) => {
  const { type, name, value } = action;
  switch (type) {
    case 'update':
      return { ...state, [name]: value };
    default:
      return;
  }
};
const initialState = {
  questionType: '',
  standard: ''
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
