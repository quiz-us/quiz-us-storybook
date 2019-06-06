# Quiz Us Components

This is a library of components that can be useful for assessments and tracking
student progress.

## Theme

Using the Quiz Us material-ui theme is optional. To do so, import the `QuizUsTheme` and pass it into the `material-ui` `ThemeProvider` that's wrapped around your react application:

```js
  import React from 'react'
  import App from './App';
  import { QuizUsTheme } from '@quiz-us/kit';

  const root = () => {
    return (
      <ThemeProvider theme={QuizUsTheme}>
        <App />
      </ThemeProvider>
    )
  }
```
