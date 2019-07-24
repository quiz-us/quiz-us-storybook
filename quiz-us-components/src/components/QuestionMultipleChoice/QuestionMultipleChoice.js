import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import { GRAY } from '../../theme/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
  answerContainer: {
    margin: '20px'
  },
  answer: {
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
      background: props => {
        return props.color === 'default' ? GRAY : props.color;
      }
    }
  }
});

const Answer = props => {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.answer} {...other} />;
};

const QuestionMultipleChoice = ({ question, answers }) => {
  const classes = useStyles();
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
      <div className={classes.answerContainer}>
        {answers.map(({ text, correct }, i) => {
          let color = 'default';
          let answeredCorrect = answered && correct;
          let answeredWrong = selectedAnswer === i && !correct;

          if (answeredCorrect) {
            color = 'green';
          } else if (answeredWrong) {
            color = 'red';
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
              {answeredCorrect && (
                <CheckCircleOutlineIcon data-testid="correct-icon" />
              )}
              {answeredWrong && (
                <HighlightOffIcon data-testid="incorrect-icon" />
              )}
            </Answer>
          );
        })}
      </div>
    </div>
  );
};

QuestionMultipleChoice.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      correct: PropTypes.bool
    })
  ).isRequired
};

export default QuestionMultipleChoice;
