import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { colors } from '@material-ui/core';

const Answer = styled(Button)({
  width: '100%',
  minHeight: 48,
  marginTop: '20px',
  textTransform: 'none'
});

const AnswerContainer = styled('div')({
  margin: '20px'
});

const QuestionMultipleChoice = ({ question, answers }) => {
  const [answerStatus, updateAnswerStatus] = useState({
    answered: false,
    selectedAnswer: null
  });
  const { answered, selectedAnswer } = answerStatus;
  console.log(answered);
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {question}
      </Typography>
      <AnswerContainer>
        {answers.map(({ text, correct }, i) => {
          let color = 'default';
          if (answered) {
            if (correct) {
              color = 'primary';
            }
            if (selectedAnswer === i && !correct) {
              color = 'secondary';
            }
          }
          return (
            <Answer
              key={text}
              color={color}
              variant="contained"
              onClick={() =>
                updateAnswerStatus({ answered: true, selectedAnswer: i })
              }
            >
              {text}
            </Answer>
          );
        })}
      </AnswerContainer>
    </div>
  );
};

QuestionMultipleChoice.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired
};

export default QuestionMultipleChoice;
