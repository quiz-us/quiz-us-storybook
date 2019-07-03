import React, { useState } from 'react';
import crypto from 'crypto';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { RichTextEditor } from '../../index';

const ALPHABET = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

const generateAnswerId = () => crypto.randomBytes(20).toString('hex');

const QuestionAndAnswer = ({
  questionType,
  updateParentQuestion,
  updateParentAnswers,
  classes
}) => {
  const [answers, updateAnswers] = useState([
    { value: undefined, answerId: generateAnswerId() }
  ]);
  const updateAllAnswers = index => {
    return updatedVal => {
      const updated = [...answers];
      updated[index].value = updatedVal;
      updateAnswers(updated);
    };
  };
  const addAnswerChoice = e => {
    e.preventDefault();
    const updated = [
      ...answers,
      { value: undefined, answerId: generateAnswerId() }
    ];
    updateAnswers(updated);
  };

  const deleteAnswerChoice = index => {
    return e => {
      e.preventDefault();
      const updated = answers.filter((answer, i) => {
        return index !== i;
      });
      updateAnswers(updated);
    };
  };
  const answer = () => {
    if (questionType === 'Multiple Choice') {
      return (
        <React.Fragment>
          {answers.map(({ value, answerId }, i) => {
            if (i > 25) {
              throw Error(
                "You've added more answer choices than the allowed amount of 26!"
              );
            }
            return (
              <div key={answerId}>
                {ALPHABET[i]}.
                <RichTextEditor
                  initialValue={value}
                  updateParentState={updateAllAnswers(i)}
                  key={answerId} // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
                />
                <button onClick={deleteAnswerChoice(i)}>delete</button>
              </div>
            );
          })}
          <button onClick={addAnswerChoice}>add</button>
        </React.Fragment>
      );
    }
    return answers.map(({ value, answerId }, i) => {
      return (
        <RichTextEditor
          key={answerId}
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
