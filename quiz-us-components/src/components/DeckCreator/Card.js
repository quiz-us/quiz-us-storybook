import React, { useState, useContext } from 'react';
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
import { CurrentDeckContext } from './CurrentDeckContext';

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

const DeckCard = ({ card }) => {
  const { currentDeck, dispatch } = useContext(CurrentDeckContext);
  const { id, question, standard, tags, answer } = card;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const actionText = expanded ? 'Hide Answer' : 'Show Answer';
  const updateCurrentDeck = () => {
    if (currentDeck[id]) {
      dispatch({ type: 'removeFromCurrent', id });
      // ({ [id]: _, ...updatedCurrentDeck } = currentDeck);
    } else {
      dispatch({ type: 'addToCurrent', card, id });
      // updatedCurrentDeck = Object.assign(currentDeck, { [id]: card });
    }
  };
  const inCurrentDeck = currentDeck[id] ? true : false;
  return (
    <Card className={classes.root}>
      <CardHeader title={question} subheader={`Standard: ${standard}`} />
      <CardContent>
        <div>{`Tags: ${tags.join(', ')}`} </div>
        <FormControlLabel
          control={
            <Switch
              checked={inCurrentDeck}
              onChange={updateCurrentDeck}
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
