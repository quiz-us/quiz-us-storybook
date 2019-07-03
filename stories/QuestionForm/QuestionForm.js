import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { QuestionForm } from '../../quiz-us-components/src';

const useStyles = makeStyles({
  root: {
    margin: '20px',
    width: '80%'
  }
});

const standards = [
  { id: 1, name: '6.5A' },
  { id: 2, name: '8.5A' },
  { id: 3, name: '8.8A' }
];

const questionTypes = ['Free Response', 'Multiple Choice'];

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <QuestionForm standards={standards} questionTypes={questionTypes} />
    </div>
  );
};
