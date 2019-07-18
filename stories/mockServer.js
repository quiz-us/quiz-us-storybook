import mock from 'xhr-mock';
export default () => {
  const suggestions = [
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' }
  ];

  mock.setup();
  mock.get(/.*\/tags\?.*/, (req, res) => {
    return res.status(200).body(JSON.stringify(suggestions));
  });

  mock.post('/search', (req, res) => {
    console.log(req);
    return res.status(200).body('yay');
  });
};
