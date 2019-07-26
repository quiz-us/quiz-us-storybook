import tags from '../data/tags';
export default mock => {
  mock.get(/.*\/tags\?.*/, (req, res) => {
    return res.status(200).body(JSON.stringify(tags));
  });
};
