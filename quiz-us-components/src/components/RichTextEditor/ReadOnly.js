// heavily based on: https://github.com/ianstormtaylor/slate/tree/master/examples/rich-text
import { Editor } from 'slate-react';
import { Value } from 'slate';
import React from 'react';
import { isKeyHotkey } from 'is-hotkey';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Plain from 'slate-plain-serializer';

const styles = {
  root: {
    backgroundColor: '#F6F8FA',
    '& blockquote': {
      borderLeft: '2px solid #ddd',
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: '10px',
      color: '#aaa',
      fontStyle: 'italic'
    },

    "& blockquote[dir = 'rtl']": {
      borderLeft: 'none',
      paddingLeft: 0,
      paddingRight: '10px',
      borderRight: '2px solid #ddd'
    },

    '& code': {
      backgroundColor: '#eee',
      padding: '3px'
    }
  },
  editor: {
    fontFamily: "'Roboto', sans-serif",
    lineHeight: 1.2,
    padding: '15px'
  },
  icon: {
    width: '.8em'
  }
};

class ReadOnly extends React.Component {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
    value: Value.fromJSON(this.props.value)
  };

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */

  ref = editor => {
    this.editor = editor;
  };

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    const { classes, placeholder } = this.props;
    return (
      <div className={classes.root}>
        <Editor
          className={classes.editor}
          autoFocus
          placeholder={placeholder}
          ref={this.ref}
          value={this.state.value}
          renderBlock={this.renderBlock}
          renderMark={this.renderMark}
          readOnly
        />
      </div>
    );
  }

  /**
   * Render a Slate block.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  };

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  /**
   * On change, save the new `value`.
   *
   * @param {Editor} editor
   */

  onChange = ({ value }) => {
    this.setState({ value });
    if (this.props.updateParentState) {
      this.props.updateParentState(value);
    }
  };

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */

  onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };
}

ReadOnly.propTypes = {
  initialValue: PropTypes.object,
  placeholder: PropTypes.string
};

ReadOnly.defaultProps = {
  initialValue: Plain.deserialize(''),
  placeholder: 'Write here...'
};

export default withStyles(styles)(ReadOnly);
