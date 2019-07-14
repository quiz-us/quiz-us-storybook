import React from 'react';
import { storiesOf } from '@storybook/react';
import CreateDeck from './CreateDeck';

export default () => {
  storiesOf('Create Deck', module).add('Deck Creation', () => <CreateDeck />);
};
