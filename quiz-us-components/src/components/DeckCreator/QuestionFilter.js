import React from 'react';
import useForm from '../../hooks/useForm';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const QuestionFilter = ({ onFilterUpdate }) => {
  const { inputs, handleInputChange } = useForm({
    standard: '',
    tag: '',
    question: ''
  });

  const onSubmit = e => {
    e.preventDefault();
    onFilterUpdate(inputs);
  };
  return (
    <form onSubmit={onSubmit}>
      <FormControl fullWidth>
        <InputLabel htmlFor="questionType-select">Standards</InputLabel>
        <Select
          value={inputs.standard}
          onChange={handleInputChange}
          inputProps={{
            name: 'standard',
            id: 'questionType-select'
          }}
        >
          {['8.5A', '8.5B', '8.8A'].map(type => {
            return (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id="standard-name"
          label="Tag"
          value={inputs.tag}
          name="tag"
          onChange={handleInputChange}
          margin="normal"
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id="standard-name"
          label="Question"
          value={inputs.question}
          name="question"
          onChange={handleInputChange}
          margin="normal"
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );
};

export default QuestionFilter;
