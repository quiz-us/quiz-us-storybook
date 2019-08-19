// heavily based on: https://github.com/ianstormtaylor/slate/tree/master/examples/rich-text
import { Editor } from 'slate-react';
import { Value } from 'slate';
import React from 'react';
import { renderBlock, renderMark } from './slateRenders';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Plain from 'slate-plain-serializer';
import styles from './RichTextEditorStyles';

class ReadOnly extends React.Component {
  state = {
    value: Value.fromJSON(this.props.value)
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Editor
          className={classes.editor}
          value={this.state.value}
          renderBlock={renderBlock}
          renderMark={renderMark}
          readOnly
        />
      </div>
    );
  }
}

ReadOnly.propTypes = {
  value: PropTypes.object
};

ReadOnly.defaultProps = {
  value: Plain.deserialize('')
};

export default withStyles(styles)(ReadOnly);
