import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import QuestionFilter from './QuestionFilter';
import Card from '@material-ui/core/Card';

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

const DeckCreator = ({ onQuery }) => {
  const classes = useStyles();
  const [cardsSearch, updateCardsSearch] = useState([]);
  const onFilterUpdate = async inputs => {
    const results = await onQuery(inputs);
    updateCardsSearch(results);
  };
  return (
    <div className={classes.root}>
      <div className={classes.parentContainer}>
        <div className={`${classes.container} ${classes.searchContainer}`}>
          <h3>Question Filter</h3>
          <QuestionFilter onFilterUpdate={onFilterUpdate} />
        </div>
        <Divider />
        <div className={`${classes.container} ${classes.resultsContainer}`}>
          <div>all question results</div>
          {cardsSearch.map(card => {
            return <div>{card.question}</div>;
          })}
        </div>
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={true}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <h3 className={classes.drawerHeader}>Current Deck</h3>
      </Drawer>
    </div>
  );
};

export default DeckCreator;
