# Question: Multiple Choice

## Description

A multiple choice question

## Usage

```js
const question = 'What is an atom?';
const answers = [
  { text: 'A collection of tiny particles' },
  { text: 'The husband of Eve in the bible' },
  { text: 'The smallest thing in the world' },
  { text: 'The basic unit of a chemical element', correct: true }
];

export default () => (
  <QuestionMultipleChoice question={question} answers={answers} />
);

```

## Properties

| Props      | Type               | Required | Values | Default | Description             |
| ---------- | ------------------ | :------: | ------ | ------- | ----------------------- |
| `question` | `string`           |  `true`  |        |         | Question text           |
| `answers`  | `array of objects` |  `true`  |        |         | Array of answer objects |

### Answer Properties

| Props     | Type      | Required | Values | Default | Description                       |
| --------- | --------- | :------: | ------ | ------- | --------------------------------- |
| `text`    | `string`  |  `true`  |        |         | Answer text                       |
| `correct` | `boolean` |          |        | `false` | Denotes the correct answer choice |
