import React from 'react';
import DeckCreator from '../../quiz-us-components/src/components/DeckCreator';
import axios from 'axios';

const onQuery = async query => {
  const res = await axios.post('/search', query);
  return res;
};

export default () => <DeckCreator onQuery={onQuery} />;
