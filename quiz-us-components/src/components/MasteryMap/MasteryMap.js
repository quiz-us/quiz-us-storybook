import React from 'react';
import ReactTable from 'react-table';
import deepOrange from '@material-ui/core/colors/deepOrange';
import orange from '@material-ui/core/colors/orange';
import lime from '@material-ui/core/colors/lime';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';
import 'react-table/react-table.css';

function createData(
  id,
  lastname,
  firstname,
  standard1,
  standard2,
  standard3,
  standard4
) {
  return {
    id,
    lastname,
    firstname,
    standard1,
    standard2,
    standard3,
    standard4
  };
}

const data = [
  createData(1, 'A', 'StudentA', null, 85, 87, 100),
  createData(2, 'B', 'StudentB', 80, 70, 20, 80),
  createData(3, 'C', 'StudentC', 60, 20, 60, 93),
  createData(4, 'D', 'StudentD', 100, 40, 50, 40),
  createData(5, 'E', 'StudentE', 20, 20, 76, 20),
  createData(6, 'F', 'StudentF', 0, 0, 0, 0)
];

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

const columns = [
  {
    Header: 'Last Name',
    accessor: 'lastname' // String-based value accessors!
  },
  {
    Header: 'First Name',
    accessor: 'firstname'
  },
  {
    Header: 'Standard 1',
    accessor: 'standard1',
    getProps: ColoredCell('standard1')
  },
  {
    Header: 'Standard 2',
    accessor: 'standard2',
    getProps: ColoredCell('standard2')
  },
  {
    Header: 'Standard 3',
    accessor: 'standard3',
    getProps: ColoredCell('standard3')
  },
  {
    Header: 'Standard 4',
    accessor: 'standard4',
    getProps: ColoredCell('standard4')
  }
];

const MasteryMap = () => {
  return <ReactTable data={data} columns={columns} />;
};

export default MasteryMap;
