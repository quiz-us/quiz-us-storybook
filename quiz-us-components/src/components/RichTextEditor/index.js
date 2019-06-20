// Import React!
import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'A line of text in a paragraph.'
          }
        ]
      }
    ]
  }
});

const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: '`', type: 'code' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: '~', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' })
];

function MarkHotkey(options) {
  const { type, key } = options;

  return {
    onKeyDown(event, editor, next) {
      if (!event.ctrlKey || event.key !== key) return next();
      event.preventDefault();
      editor.toggleMark(type);
    }
  };
}

export default class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: initialValue
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange({ value }) {
    this.setState({ value });
  }

  onKeyDown(event, editor, next) {
    if (!event.ctrlKey) return next();

    switch (event.key) {
      case 'b': {
        event.preventDefault();
        editor.toggleMark('bold');
        break;
      }
      default: {
        return next();
      }
    }
  }

  renderMark(props, editor, next) {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>;
      case 'code':
        return <code>{props.children}</code>;
      case 'italic':
        return <em>{props.children}</em>;
      case 'strikethrough':
        return <del>{props.children}</del>;
      case 'underline':
        return <u>{props.children}</u>;
      default:
        return next();
    }
  }

  render() {
    return (
      <Editor
        plugins={plugins}
        value={this.state.value}
        onChange={this.onChange}
        renderMark={this.renderMark}
      />
    );
  }
}
