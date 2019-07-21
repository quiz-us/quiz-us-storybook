import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    marginBottom: '20px'
  },
  actions: {
    justifyContent: 'center'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
});

const DeckCard = ({ card: { question, standard, tags, answer } }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const actionText = expanded ? 'Hide Answer' : 'Show Answer';
  return (
    <Card className={classes.root}>
      <CardHeader title={question} subheader={`Standard: ${standard}`} />
      <CardContent>
        <div>{`Tags: ${tags.join(', ')}`} </div>
        <FormControlLabel
          control={
            <Switch
              checked={true}
              onChange={() => {}}
              value="checkedB"
              color="primary"
            />
          }
          label="In Current Deck"
        />
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          aria-label={actionText}
        >
          <ExpandMoreIcon className={expanded ? classes.expandOpen : ''} />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{answer}</CardContent>
      </Collapse>
    </Card>
  );
};

export default DeckCard;
