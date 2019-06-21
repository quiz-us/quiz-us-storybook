import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import useForm from '../../hooks/useForm';

const useStyles = makeStyles({
  form: {
    padding: '20px',
    width: '100%'
  },
  formControl: {
    width: '40%'
  }
});

const useSelectStyles = makeStyles({
  root: {
    padding: '10px'
  },
  select: {
    '&:focus': {
      backgroundColor: 'transparent'
    }
  }
});

const QuestionForm = ({ standards }) => {
  const classes = useStyles();
  const selectClasses = useSelectStyles();
  console.log(classes);
  const { inputs, handleInputChange } = useForm({
    standard: ''
  });
  return (
    <form className={classes.form}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="standard-select">Select Standard</InputLabel>
        <Select
          value={inputs.standard}
          onChange={handleInputChange}
          variant="outlined"
          classes={selectClasses}
          className={classes.select}
          inputProps={{
            name: 'standard',
            id: 'standard-select'
          }}
        >
          {standards.map(standard => {
            return (
              <MenuItem
                className={classes.menuItem}
                key={standard.id}
                value={standard.id}
              >
                {standard.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </form>
  );
};

QuestionForm.propTypes = {};

export default QuestionForm;
