import React from 'react';
import PropTypes from 'prop-types';

const QuestionMultipleChoice = ({ question, answers }) => {
  return (
    <div>
      {question}
      {answers.map(({ text }) => {
        return <div key={text}>{text}</div>;
      })}
    </div>
  );
};

QuestionMultipleChoice.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired
};

export default QuestionMultipleChoice;
