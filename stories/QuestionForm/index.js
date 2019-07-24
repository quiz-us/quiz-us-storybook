import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import Readme from '../../quiz-us-components/src/components/QuestionForm/README.md';
import QuestionForm from './QuestionForm';

export default () => {
  storiesOf('Question Form', module)
    .addDecorator(withReadme(Readme))
    .add('QuestionForm', () => <QuestionForm />);
};
