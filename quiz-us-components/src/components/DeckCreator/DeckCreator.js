import React, { useState, useRef, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import QuestionFilter from './QuestionFilter';
import CustomCard from './Card';
import { CurrentDeckProvider } from './CurrentDeckContext';
import CurrentDeck from './CurrentDeck';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  filtersContainer: {
    position: 'fixed',
    width: '100%'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  drawerPaper: {
    padding: '20px'
  },
  placeholder: {
    height: ({ placeholderHeight }) => `${placeholderHeight}px`,
    width: '100%'
  },
  cardsContainer: {
    display: 'flex',
    height: ({ placeholderHeight }) =>
      `${window.innerHeight - placeholderHeight}px`
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

const StyledPlaceholder = props => {
  const classes = useStyles(props);
  return <div className={classes.placeholder} {...props} />;
};

const StyledCardContainers = props => {
  const classes = useStyles(props);
  return (
    <div className={classes.cardsContainer} {...props}>
      {props.children}
    </div>
  );
};

const DeckCreator = ({ onQuery }) => {
  const classes = useStyles();
  const [cardsSearch, updateCardsSearch] = useState([]);
  const [currentDeck, setCurrentDeck] = useState({});
  const [filterOpen, setFilterOpen] = useState(true);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const filtersContainerRef = useRef(null);
  useLayoutEffect(() => {
    setPlaceholderHeight(filtersContainerRef.current.clientHeight);
  }, [filterOpen]);

  const toggleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

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
        <AppBar ref={filtersContainerRef}>
          <Card>
            <CardHeader title="Question Filter" />
            {filterOpen && (
              <CardContent>
                <QuestionFilter onFilterUpdate={onFilterUpdate} />
              </CardContent>
            )}
            <CardActions className={classes.actions}>
              <IconButton onClick={toggleFilterOpen}>
                <ExpandMoreIcon
                  className={filterOpen ? classes.expandOpen : ''}
                />
              </IconButton>
            </CardActions>
          </Card>
        </AppBar>

        <StyledPlaceholder placeholderHeight={placeholderHeight} />
        <StyledCardContainers placeholderHeight={placeholderHeight}>
          <div
            className={`${classes.bottomContainer} ${classes.resultsContainer}`}
          >
            <h3>Search Results</h3>
            {cardsSearch.map(card => {
              return (
                <CustomCard
                  key={`search-${card.id}`}
                  card={card}
                  currentDeck={currentDeck}
                  handleCurrentDeckChange={handleCurrentDeckChange}
                />
              );
            })}
          </div>
          <CurrentDeck classes={classes} />
        </StyledCardContainers>
      </div>
    </CurrentDeckProvider>
  );
};

export default DeckCreator;
