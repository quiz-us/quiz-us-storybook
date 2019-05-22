import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import Readme from '../../quiz-us-components/Card/README.md';
import Card from './Card';

export default () => {
  storiesOf('Cards', module)
    .addDecorator(withReadme(Readme))
    .add('Card', () => <Card />);
};
