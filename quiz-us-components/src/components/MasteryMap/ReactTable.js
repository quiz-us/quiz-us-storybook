import React from 'react';
import ReactTable from 'react-table';
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
  return { lastname, firstname, standard1, standard2, standard3, standard4 };
}

const data = [
  createData(1, 'A', 'StudentA', null, 100, 110, 100),
  createData(2, 'B', 'StudentB', 80, 70, 20, 80),
  createData(3, 'C', 'StudentC', 60, 20, 60, 90),
  createData(4, 'D', 'StudentD', 100, 40, 50, 40),
  createData(5, 'E', 'StudentE', 20, 20, 70, 20),
  createData(6, 'F', 'StudentF', 0, 0, 0, 0)
];

const calculateBackgroundColor = score => {
  if (!score && score !== 0) {
    return 'gray';
  } else if (score > 85) {
    return 'green';
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
