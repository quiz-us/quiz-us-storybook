import React from 'react';
import { QuestionMultipleChoice } from '../../quiz-us-components/src';

const question = 'What is an atom?';
const answers = [
  { text: 'A collection of tiny particles' },
  { text: 'The husband of Eve in the bible' },
  { text: 'The smallest thing in the world' },
  { text: 'The basic unit of a chemical element', correct: true }
];

export default () => (
  <QuestionMultipleChoice question={question} answers={answers} />
);
