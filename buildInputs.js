import fs from 'fs';

const componentDirs = fs.readdirSync(
  __dirname + '/quiz-us-components/src/components'
);
const inputs = {};
componentDirs.forEach(dir => {
  inputs[dir] = `quiz-us-components/src/components/${dir}/index.js`;
});
inputs['QuizUsTheme'] = 'quiz-us-components/src/theme/index.js';
inputs['index'] = 'quiz-us-components/src/index.js';

export default inputs;
