import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import QuestionFilter from './QuestionFilter';
import Drawer from '@material-ui/core/Drawer';
import Card from './Card';
import { CurrentDeckProvider } from './CurrentDeckContext';
import CurrentDeck from './CurrentDeck';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  filtersContainer: {},
  drawerPaper: {
    padding: '20px'
  },
  placeholder: {
    height: ({ height }) => `${height}px`,
    width: '100%'
  },
  cardsContainer: {
    display: 'flex'
  },
  bottomContainer: {
    padding: '0 20px',
    width: '50%',
    overflow: 'scroll'
  },
  resultsContainer: {},
  currentDeckContainer: {
    borderLeft: '1px solid #E0E0E0'
  }
});

const Placeholder = props => {
  const classes = useStyles(props);
  return <div className={classes.placeholder} {...props} />;
};

const DeckCreator = ({ onQuery }) => {
  const classes = useStyles();
  const [cardsSearch, updateCardsSearch] = useState([]);
  const [currentDeck, setCurrentDeck] = useState({});
  const [filterOpen, toggleFilterOpen] = useState(true);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const filtersContainerRef = useRef(null);
  useEffect(() => {
    console.log(filtersContainerRef.current.clientHeight);
    setPlaceholderHeight(filtersContainerRef.current.clientHeight);
  });

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
        <Drawer
          PaperProps={{
            ref: filtersContainerRef
          }}
          className={classes.filtersContainer}
          anchor="top"
          open={filterOpen}
          onClose={() => toggleFilterOpen(false)}
          variant="persistent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <h3>Question Filter</h3>
          <QuestionFilter onFilterUpdate={onFilterUpdate} />
        </Drawer>
        <Placeholder height={placeholderHeight} />
        <div className={classes.cardsContainer}>
          <div
            className={`${classes.bottomContainer} ${classes.resultsContainer}`}
          >
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
          <CurrentDeck classes={classes} />
        </div>
      </div>
    </CurrentDeckProvider>
  );
};

export default DeckCreator;
