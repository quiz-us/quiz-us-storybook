import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 400;

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

const DeckCreator = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.parentContainer}>
        <div className={`${classes.container} ${classes.searchContainer}`}>
          <h3>Question Filters</h3>
          <div>standards filter</div>
          <div>tags filter</div>
          <div>question text filter</div>
        </div>
        <Divider />
        <div className={`${classes.container} ${classes.resultsContainer}`}>
          <h3>Questions</h3>
          <div>all question results</div>
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
