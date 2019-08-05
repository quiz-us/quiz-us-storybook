import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import TagsForm from './TagsForm';
import useForm from '../../hooks/useForm';
import { QuestionFormContext } from './QuestionFormContext';
import QuestionAndAnswers from './QuestionAndAnswers';
import Plain from 'slate-plain-serializer';
import empty from 'is-empty';

const useStyles = makeStyles({
  form: {
    width: '90%',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    // width: '40%',
    marginBottom: '20px'
  },
  wideFormControl: {
    // width: '90%'
  },
  questionAnswerContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  submitButton: {
    width: '40%',
    margin: '0 auto'
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

const Form = ({ standards, questionTypes, onSubmit, fetchTags }) => {
  const { state, dispatch } = useContext(QuestionFormContext);
  const { questionType, standard } = state;
  const classes = useStyles();
  const selectClasses = useSelectStyles();

  const handleInputChange = e => {
    dispatch({
      type: 'update',
      name: e.target.name,
      value: e.target.value
    });
  };

  return (
    <Card>
      <form className={classes.form}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="questionType-select">
            Select Question Type
          </InputLabel>
          <Select
            value={questionType}
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
            value={standard}
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
          className={`${classes.formControl} ${classes.wideFormControl}`}
        >
          <TagsForm fetchTags={fetchTags} />
        </FormControl>
      </form>
    </Card>
  );
};

Form.propTypes = {
  standards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ),
  questionTypes: PropTypes.arrayOf(PropTypes.string.isRequired),
  onSubmit: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired
};

export default Form;

// const { inputs, handleInputChange } = useForm({
//   standard: '',
//   questionType: '',
//   tags: [],
//   question: {},
//   answers: []
// });
// const [missingFields, updateMissingFields] = useState(false);

// const updateQuestion = question => {
//   handleInputChange({
//     target: {
//       name: 'question',
//       value: question
//     }
//   });
// };

// const updateAnswers = answers => {
//   handleInputChange({
//     target: {
//       name: 'answers',
//       value: answers
//     }
//   });
// };

// const closeEmptyFieldsWarning = () => {
//   updateMissingFields(false);
// };

// const validateAnswers = answers => {
//   /**
//    * @todo: write answers validation:
//    * 1. if it's multiple choice there needs to be more than 1 choice
//    * 2. no empty string choices
//    * */
// };

// const validateForm = () => {
//   const inputKeys = Object.keys(inputs);
//   for (let i = 0; i < inputKeys.length; i += 1) {
//     const inputKey = inputKeys[i];
//     let inputVal = inputs[inputKey];
//     if (inputKey === 'question') {
//       inputVal = Plain.serialize(inputVal);
//     } else if (inputKey === 'answers') {
//       inputVal = true;
//       /** @todo: */
//       // validateAnswers(inputVal)
//     }
//     if (empty(inputVal)) {
//       console.error(`${inputKey} is unfilled!`);
//       return false;
//     }
//   }
//   return true;
// };

// const handleSubmit = e => {
//   e.preventDefault();
//   if (validateForm()) {
//     onSubmit(inputs);
//   } else {
//     updateMissingFields(true);
//   }
// };

//   <QuestionAndAnswers
//     classes={classes}
//     updateParentQuestion={updateQuestion}
//     updateParentAnswers={updateAnswers}
//     questionType={inputs.questionType}
//   />
//   <Button
//     className={classes.submitButton}
//     type="submit"
//     variant="contained"
//     color="primary"
//     data-testid="submit-button"
//   >
//     Submit
//         </Button>

// <Dialog open={missingFields} onClose={closeEmptyFieldsWarning}>
//   <DialogTitle>Please fill out all fields!</DialogTitle>
//   <DialogActions>
//     <Button onClick={closeEmptyFieldsWarning} color="primary" autoFocus>
//       Close
//           </Button>
//   </DialogActions>
// </Dialog>
