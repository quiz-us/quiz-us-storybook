import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TagsForm from './TagsForm';
import useForm from '../../hooks/useForm';

const useStyles = makeStyles({
  form: {
    padding: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    width: '40%',
    marginBottom: '20px'
  },
  tagsFormControl: {
    width: '90%'
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

const QuestionForm = ({ standards, questionTypes }) => {
  const classes = useStyles();
  const selectClasses = useSelectStyles();
  const { inputs, handleInputChange } = useForm({
    standard: '',
    questionType: ''
  });
  return (
    <form className={classes.form}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="questionType-select">
          Select Question Type
        </InputLabel>
        <Select
          value={inputs.questionType}
          onChange={handleInputChange}
          classes={selectClasses}
          className={classes.select}
          inputProps={{
            name: 'questionType',
            id: 'questionType-select'
          }}
        >
          {questionTypes.map(type => {
            return (
              <MenuItem className={classes.menuItem} key={type} value={type}>
                {type}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="standard-select">Select Standard</InputLabel>
        <Select
          value={inputs.standard}
          onChange={handleInputChange}
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
      <FormControl
        className={`${classes.formControl} ${classes.tagsFormControl}`}
      >
        <TagsForm />
      </FormControl>
    </form>
  );
};

QuestionForm.propTypes = {
  standards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ),
  questionTypes: PropTypes.arrayOf(PropTypes.string.isRequired)
};

export default QuestionForm;
