import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import QuestionFilter from './QuestionFilter';
import Card from './Card';
import { CurrentDeckProvider } from './CurrentDeckContext';
import CurrentDeck from './CurrentDeck';

const drawerWidth = '40%';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  parentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  container: {
    padding: '10px 20px'
  },
  searchContainer: {
    flexBasis: '40%'
  },
  resultsContainer: {
    flexBasis: '60%'
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    padding: '0 20px'
  }
});

export const ThemeContext = React.createContext({
  currentDeck: {},
  updateCurrentDeck: event => {
    console.log('what happened', event);
  }
});

const DeckCreator = ({ onQuery }) => {
  const classes = useStyles();
  const [cardsSearch, updateCardsSearch] = useState([]);
  const [currentDeck, setCurrentDeck] = useState({});
  const handleCurrentDeckChange = updatedDeck => {
    setCurrentDeck(updatedDeck);
  };
  const onFilterUpdate = async inputs => {
    const { data } = await onQuery(inputs);
    updateCardsSearch(data);
  };
  return (
    <CurrentDeckProvider>
      <div className={classes.root}>
        <div className={classes.parentContainer}>
          <div className={`${classes.container} ${classes.searchContainer}`}>
            <h3>Question Filter</h3>
            <QuestionFilter onFilterUpdate={onFilterUpdate} />
          </div>
          <Divider />
          <div className={`${classes.container} ${classes.resultsContainer}`}>
            <h3>Search Results</h3>
            {cardsSearch.map(card => {
              return (
                <Card
                  key={`search-${card.id}`}
                  card={card}
                  currentDeck={currentDeck}
                  handleCurrentDeckChange={handleCurrentDeckChange}
                />
              );
            })}
          </div>
        </div>
        <CurrentDeck />
      </div>
    </CurrentDeckProvider>
  );
};

export default DeckCreator;
