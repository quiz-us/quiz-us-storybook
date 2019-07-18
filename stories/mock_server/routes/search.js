import questions from '../data/questions';

const search = filters => {
  const { standard, question, tags } = filters;
  let results = [];

  if (standard) {
    results = questions.filter(q => q.standard === standard);
  }
  /** @todo: more filtering here */
};
export default mock => {
  mock.post('/search', (req, res) => {
    const { _body } = req;
    const searchResults = search(_body);
    return res.status(200).body('yay');
  });
};
