import stringSimilarity from 'string-similarity';
import questions from '../data/questions';

const search = filters => {
  const { standard, question, tag } = JSON.parse(filters);
  let results = questions;

  if (standard) {
    results = results.filter(q => q.standard === standard);
  }

  if (tag) {
    results = results.filter(({ tags }) => {
      for (let i = 0; i < tags.length; i += 1) {
        const t = tags[i];
        if (stringSimilarity.compareTwoStrings(t, tag) > 0.5) {
          return true;
        }
      }
      return false;
    });
  }
  if (question) {
    results = results.filter(
      q => stringSimilarity.compareTwoStrings(q.question, question) > 0.5
    );
  }

  return results;
};
export default mock => {
  mock.post('/search', (req, res) => {
    const { _body } = req;
    const searchResults = search(_body);
    console.log('HERE WERE MATCHES', searchResults);
    return res.status(200).body(JSON.stringify(searchResults));
  });
};
