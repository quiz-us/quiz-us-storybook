import React from 'react';
import DeckCreator from '../../quiz-us-components/src/components/DeckCreator';
import axios from 'axios';

const questions = [
  {
    standard: '8.5A',
    tags: ['metal', 'periodic table', 'science'],
    question: 'What is a metal?',
    answer:
      'a solid material that is typically hard, shiny, malleable, fusible, and ductile, with good electrical and thermal conductivity'
  },
  {
    standard: '8.8A',
    tags: ['nonmetal', 'science'],
    question: 'What is a nonmetal?',
    answer: 'an element or substance that is not a metal.'
  }
];

const onQuery = async query => {
  const res = await axios.post('/search', query);
};

export default () => <DeckCreator onQuery={onQuery} />;
