import React from 'react';
import ReactTable from 'react-table';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import 'react-table/react-table.css';

// color logic:
// low: lowest[high hue] -> less low[low hue]
// med: lowest[high hue] -> less low[low hue]
// high: lowest[low hue] -> higher[high hue]

function createData(
  id,
  lastname,
  firstname,
  standard1,
  standard2,
  standard3,
  standard4
) {
  return { lastname, firstname, standard1, standard2, standard3, standard4 };
}

const data = [
  createData(1, 'A', 'StudentA', null, 85, 87, 100),
  createData(2, 'B', 'StudentB', 80, 70, 20, 80),
  createData(3, 'C', 'StudentC', 60, 20, 60, 93),
  createData(4, 'D', 'StudentD', 100, 40, 50, 40),
  createData(5, 'E', 'StudentE', 20, 20, 70, 20),
  createData(6, 'F', 'StudentF', 0, 0, 0, 0)
];

const hundredCeil = n => Math.ceil(n / 100) * 100;

const calculateBackgroundColor = score => {
  let scaledScore;
  if (!score && score !== 0) {
    return 'gray';
  } else if (score >= 85) {
    scaledScore = (score - 85) * 60;
    return green[hundredCeil(scaledScore)];
  } else if (score > 70) {
    return 'yellow';
  } else {
    return 'red';
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
