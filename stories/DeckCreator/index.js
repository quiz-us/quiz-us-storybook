import React from 'react';
import { storiesOf } from '@storybook/react';
import DeckCreator from './DeckCreator';

export default () => {
  storiesOf('Deck Creation', module).add('Deck Creator', () => <DeckCreator />);
};
