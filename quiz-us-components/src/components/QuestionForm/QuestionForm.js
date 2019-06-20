import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import useForm from '../../hooks/useForm';

const useStyles = makeStyles({
  root: {
    padding: '20px',
    width: '100%'
  },
  formControl: {
    width: '100%'
  },
  select: {
    width: '80%'
  }
});
const QuestionForm = ({ question, answers }) => {
  const classes = useStyles();
  const {inputs, handleInputChange } = useForm({
    standard: ''
  });
  return (
    <form className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="standard-select">Select Standard</InputLabel>
        <Select
          value={inputs.standard}
          onChange={handleInputChange}
          className={classes.select}
          inputProps={{
            name: 'standard',
            id: 'standard-select'
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};

QuestionForm.propTypes = {};

export default QuestionForm;
