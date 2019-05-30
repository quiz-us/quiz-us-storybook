'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styles = require('@material-ui/styles');
var Typography = _interopDefault(require('@material-ui/core/Typography'));
var Button = _interopDefault(require('@material-ui/core/Button'));
var PropTypes = _interopDefault(require('prop-types'));
var red = _interopDefault(require('@material-ui/core/colors/red'));
var green = _interopDefault(require('@material-ui/core/colors/green'));

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var Answer = styles.styled(function (_ref) {
  var color = _ref.color,
      other = _objectWithoutProperties(_ref, ["color"]);

  return React__default.createElement(Button, other);
})({
  width: '100%',
  background: function background(props) {
    switch (props.color) {
      case 'red':
        return red[400];

      case 'green':
        return green[400];

      default:
        return null;
    }
  },
  minHeight: 48,
  marginTop: '20px',
  textTransform: 'none',
  '&:hover': {
    background: function background(props) {
      console.log(props);
      return props.color === 'default' ? '#e0e0e0' : props.color;
    }
  }
});
var AnswerContainer = styles.styled('div')({
  margin: '20px'
});

var QuestionMultipleChoice = function QuestionMultipleChoice(_ref2) {
  var question = _ref2.question,
      answers = _ref2.answers;

  var _useState = React.useState({
    answered: false,
    selectedAnswer: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      answerStatus = _useState2[0],
      updateAnswerStatus = _useState2[1];

  var answered = answerStatus.answered,
      selectedAnswer = answerStatus.selectedAnswer;
  return React__default.createElement("div", null, React__default.createElement(Typography, {
    variant: "h4",
    gutterBottom: true
  }, question), React__default.createElement(AnswerContainer, null, answers.map(function (_ref3, i) {
    var text = _ref3.text,
        correct = _ref3.correct;
    var color = 'default';

    if (answered) {
      if (correct) {
        color = 'green';
      }

      if (selectedAnswer === i && !correct) {
        color = 'red';
      }
    }

    return React__default.createElement(Answer, {
      key: text,
      color: color,
      variant: "contained",
      onClick: function onClick() {
        return updateAnswerStatus({
          answered: true,
          selectedAnswer: i
        });
      }
    }, text);
  })));
};

QuestionMultipleChoice.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired
};

exports.QuestionMultipleChoice = QuestionMultipleChoice;
