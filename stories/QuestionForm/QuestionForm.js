import React from 'react';
import { QuestionForm } from '../../quiz-us-components/src';

const standards = [
  { id: 1, name: '6.5A' },
  { id: 2, name: '8.5A' },
  { id: 3, name: '8.8A' }
];

export default () => <QuestionForm standards={standards} />;
