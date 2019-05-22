import React from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';

const Answer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '1px solid gray',
  borderRadius: 3,
  minHeight: 48,
  padding: '0 30px',
  marginTop: '10px',
  cursor: 'pointer'
});

const QuestionMultipleChoice = ({ question, answers }) => {
  return (
    <div>
      {question}
      {answers.map(({ text }) => {
        return <Answer key={text}>{text}</Answer>;
      })}
    </div>
  );
};

QuestionMultipleChoice.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired
};

export default QuestionMultipleChoice;
