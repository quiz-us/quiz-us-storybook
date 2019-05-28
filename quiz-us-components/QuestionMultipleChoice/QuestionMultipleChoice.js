import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const Answer = styled(({ color, ...other }) => <Button {...other} />)({
  width: '100%',
  background: props => {
    switch (props.color) {
      case 'red':
        return red[400];
      case 'green':
        return green[400];
      default:
        return null;
    }
  },
  minHeight: 48,
  marginTop: '20px',
  textTransform: 'none',
  '&:hover': {
    background: props => props.color
  }
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
              color = 'green';
            }
            if (selectedAnswer === i && !correct) {
              color = 'red';
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
