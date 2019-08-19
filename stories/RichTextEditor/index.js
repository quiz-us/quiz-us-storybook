import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import Readme from '../../quiz-us-components/src/components/RichTextEditor/README.md';
import RichTextEditor from './RichTextEditor';
import ReadOnly from './ReadOnly';

export default () => {
  storiesOf('Rich Text Editor', module)
    .addDecorator(withReadme(Readme))
    .add('RichTextEditor', () => <RichTextEditor />)
    .add('Read Only', () => <ReadOnly />);
};
