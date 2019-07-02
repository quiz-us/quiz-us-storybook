import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { RichTextEditor } from '../../index';

const QuestionAndAnswer = ({ questionType, updateQuestion, classes }) => {
  const answer = () => {
    if (questionType === 'Free Response') {
      return <RichTextEditor />;
    } else if (questionType === 'Multiple Choice') {
      return (
        <React.Fragment>
          A.
          <RichTextEditor />
          B.
          <RichTextEditor />
        </React.Fragment>
      );
    }
    return null;
  };
  return (
    <div className={classes.questionAnswerContainer}>
      <FormControl
        className={`${classes.formControl} ${classes.wideFormControl}`}
      >
        <h3>Question: </h3>
        <RichTextEditor updateParentState={updateQuestion} />
      </FormControl>
      <FormControl
        className={`${classes.formControl} ${classes.wideFormControl}`}
      >
        <h3>Answer: </h3>
        {answer()}
      </FormControl>
    </div>
  );
};

QuestionAndAnswer.propTypes = {};

export default QuestionAndAnswer;
