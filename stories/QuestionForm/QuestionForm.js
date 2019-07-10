import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { QuestionForm } from '../../quiz-us-components/src';
import axios from 'axios';
import mock from 'xhr-mock';

const suggestions = [
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' }
];

mock.setup();
mock.get(/.*\/tags\?.*/, (req, res) => {
  return res.status(200).body(JSON.stringify(suggestions));
});
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
