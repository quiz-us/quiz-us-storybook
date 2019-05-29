import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import Readme from '../../quiz-us-components/src/QuestionMultipleChoice/README.md';
import MultipleChoice from './MultipleChoice';

export default () => {
  storiesOf('Questions', module)
    .addDecorator(withReadme(Readme))
    .add('MultipleChoice', () => <MultipleChoice />);
};
