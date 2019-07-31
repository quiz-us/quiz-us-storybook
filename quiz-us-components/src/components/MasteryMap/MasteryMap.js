import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ReactTable from 'react-table';
import deepOrange from '@material-ui/core/colors/deepOrange';
import orange from '@material-ui/core/colors/orange';
import lime from '@material-ui/core/colors/lime';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import 'react-table/react-table.css';

const useStyles = makeStyles({
  columnHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoIcon: {
    fill: 'gray',
    fontSize: '1em'
  }
});

const calculateBackgroundColor = score => {
  if (!score && score !== 0) {
    return blueGrey[400];
  } else if (score === 100) {
    return green['A700'];
  } else if (score >= 95) {
    return green['A400'];
  } else if (score >= 90) {
    return green['A200'];
  } else if (score >= 85) {
    return lime['A200'];
  } else if (score >= 80) {
    return amber['A400'];
  } else if (score >= 75) {
    return amber['A700'];
  } else if (score >= 70) {
    return orange['A700'];
  } else if (score >= 60) {
    return deepOrange['A200'];
  } else if (score >= 50) {
    return deepOrange['A400'];
  } else if (score >= 0) {
    return deepOrange['A700'];
  } else {
    return blueGrey[400];
  }
};

const ColoredCell = standard => (_, rowInfo) => {
  return {
    style: {
      background: rowInfo && calculateBackgroundColor(rowInfo.row[standard])
    }
  };
};

const generateColumns = (standards, classes) => {
  const setColumns = [
    {
      Header: 'Name',
      accessor: 'name',
      filterable: true
    }
  ];
  return setColumns.concat(
    Object.keys(standards).map(standardId => {
      const { name, description } = standards[standardId];
      return {
        Header: () => (
          <div className={classes.columnHeader}>
            {name}
            <Tooltip title={description} placement="top-end">
              <InfoIcon className={classes.infoIcon} />
            </Tooltip>
          </div>
        ),
        accessor: standardId,
        getProps: ColoredCell(standardId)
      };
    })
  );
};

const MasteryMap = ({ standards, studentPerformance }) => {
  const classes = useStyles();
  const columns = useMemo(() => generateColumns(standards, classes), [
    standards,
    classes
  ]);
  return <ReactTable data={studentPerformance} columns={columns} />;
};

MasteryMap.propTypes = {
  studentPerformance: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ),
  standards: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};
export default MasteryMap;
