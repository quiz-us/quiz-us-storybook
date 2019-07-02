import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { RichTextEditor } from '../../index';

const LETTER_CHOICE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

const QuestionAndAnswer = ({
  questionType,
  updateParentQuestion,
  updateParentAnswers,
  classes
}) => {
  const [answers, updateAnswers] = useState([undefined]);
  const updateAllAnswers = index => {
    return updatedVal => {
      const updated = [...answers];
      updated[index] = updatedVal;
      updateAnswers(updated);
    };
  };
  const addAnswerChoice = e => {
    e.preventDefault();
    const updated = [...answers, undefined];
    updateAnswers(updated);
  };

  const deleteAnswerChoice = index => {
    return e => {
      e.preventDefault();
      const updated = answers.filter((answer, i) => {
        return index !== i;
      });
      console.log(updated);
      updateAnswers(updated);
    };
  };
  const answer = () => {
    if (questionType === 'Multiple Choice') {
      return answers.map((value, i) => {
        return (
          <div>
            {LETTER_CHOICE[i]}.
            <RichTextEditor
              initialValue={value}
              updateParentState={updateAllAnswers(i)}
            />
            <button onClick={addAnswerChoice}>add</button>
            <button onClick={deleteAnswerChoice(i)}>delete</button>
          </div>
        );
      });
    }
    return answers.map((value, i) => {
      return (
        <RichTextEditor
          initialValue={value}
          updateParentState={updateAllAnswers(i)}
        />
      );
    });
  };
  return (
    <div className={classes.questionAnswerContainer}>
      <FormControl
        className={`${classes.formControl} ${classes.wideFormControl}`}
      >
        <h3>Question: </h3>
        <RichTextEditor updateParentState={updateParentQuestion} />
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
