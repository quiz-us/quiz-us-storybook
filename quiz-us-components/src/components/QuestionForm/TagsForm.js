// using example from: https://material-ui.com/components/autocomplete/#downshift
import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

function DownshiftMultiple(props) {
  const { classes, updateTags, fetchTags } = props;
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState([]);
  function handleKeyDown(event) {
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  function getSuggestions(input) {
    const inputValue = input.trim().toLowerCase();
    fetchTags(inputValue).then(tags => {
      setSuggestions(tags);
    });
  }

  function handleInputChange(event) {
    const input = event.target.value;
    setInputValue(input);
    getSuggestions(input);
  }

  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue('');
    setSelectedItem(newSelectedItem);
    updateTags(newSelectedItem);
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
    updateTags(newSelectedItem);
  };

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        selectedItem: selectedItem2,
        highlightedIndex
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: 'Add one or more tag(s)'
        });

        return (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              label: 'Tags',
              InputLabelProps: getLabelProps(),
              InputProps: {
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onBlur,
                onChange: event => {
                  handleInputChange(event);
                  onChange(event);
                },
                onFocus
              },
              inputProps
            })}

            {isOpen ? (
              <Paper className={classes.paper} square>
                {suggestions.map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2
                  })
                )}
              </Paper>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired,
  updateTags: PropTypes.func.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  inputRoot: {
    flexWrap: 'wrap'
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1
  },
  divider: {
    height: theme.spacing(2)
  }
}));

const TagForm = props => {
  const classes = useStyles();
  const { updateTags, fetchTags } = props;
  return (
    <div className={classes.root}>
      <DownshiftMultiple
        classes={classes}
        updateTags={updateTags}
        fetchTags={fetchTags}
      />
    </div>
  );
};

TagForm.propTypes = {
  updateTags: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired
};

export default TagForm;
