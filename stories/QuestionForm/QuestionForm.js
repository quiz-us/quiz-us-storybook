import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { QuestionForm } from '../../quiz-us-components/src';
import axios from 'axios';

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

const onSubmit = formData => alert(JSON.stringify(formData, 2));

const fetchTags = async input => {
  const res = await axios.get(`/tags?input=${input}`);
  return res.data;
};

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <QuestionForm
        standards={standards}
        questionTypes={questionTypes}
        onSubmit={onSubmit}
        fetchTags={fetchTags}
      />
    </div>
  );
};
