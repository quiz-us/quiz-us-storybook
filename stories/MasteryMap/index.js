import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import Readme from '../../quiz-us-components/src/components/MasteryMap/README.md';
import { MasteryMap } from '../../quiz-us-components/src';

export default () => {
  storiesOf('MasteryMap', module)
    .addDecorator(withReadme(Readme))
    .add('MasteryMap', () => <MasteryMap />);
};
