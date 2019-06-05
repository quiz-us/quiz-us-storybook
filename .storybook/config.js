import { configure, addDecorator } from '@storybook/react';
import { addReadme } from 'storybook-readme';
import QuizUsTheme from '../quiz-us-components/src/theme';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

addDecorator(addReadme);
addDecorator(story => (
  <ThemeProvider theme={QuizUsTheme}>{story()}</ThemeProvider>
));

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
