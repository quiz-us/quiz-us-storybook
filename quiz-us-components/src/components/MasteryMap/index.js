import React from 'react';
import PropTypes from 'prop-types';

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import EnhancedTableHead from './components/TableHead';
import { stableSort, getSorting } from "../MasteryMap/utils";
import EnhancedTableToolbar from './components/EnhancedTableToolbar';
import StandardDisplayColor from './components/StandardDisplayColor';

//key name needs to be the same as the readrows id
function createData(id, lastname, firstname, standard1, standard2, standard3, standard4) {
  return { id, lastname, firstname, standard1, standard2, standard3, standard4 };
}

const rows = [
  createData(1, 'A', 'StudentA', null, 100, 110, 100),
  createData(2, 'B', 'StudentB', 80, 70, 20, 80),
  createData(3, 'C', 'StudentC', 60, 20, 60, 90),
  createData(4, 'D', 'StudentD', 100, 40, 50, 40),
  createData(5, 'E', 'StudentE', 20, 20, 70, 20),
  createData(6, 'F', 'StudentF', 0, 0, 0, 0),
];

//key name needs to be the same as the readrows id
const headRows = [
  { id: 'lastname', numeric: false, disablePadding: false, label: 'Last' },
  { id: 'firstname', numeric: false, disablePadding: false, label: 'First' },
  { id: 'standard1', numeric: true, disablePadding: true, label: 'Standard1' },
  { id: 'standard2', numeric: true, disablePadding: true, label: 'Standard2' },
  { id: 'standard3', numeric: true, disablePadding: true, label: 'Standard3' },
  { id: 'standard4', numeric: true, disablePadding: true, label: 'Standard4' },
];

// const headRows = () => {
//   const ans = [];
//   rows.forEach(rowObj => {
//     let temp;

//     Object.keys(rowObj).forEach(key => {
//       const value = rowObj[key];
//       // console.log("key", key, "value", value);
//       // if (key === 'id') { continue; }
//       if (key === 'lastname' || key === 'firstname') {
//          temp = {
//            id: key,
//            numeric: false,
//            disablePadding: false,
//            label: key
//          };
//         // console.log("temp", temp);
//       } else {
//         temp = {
//           id: key,
//           numeric: true,
//           disablePadding: false,
//           label: key
//         };
//       }
//       ans.push(temp);
//     })
//   });

//   return ans;
// }

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

export default function MasteryMap() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  function handleChangeDense(event) {
    setDense(event.target.checked);
  }

  // headRows1();

  const formatedRows = stableSort(rows, getSorting(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      const labelId = `enhanced-table-checkbox-${index}`;
      return (
        <TableRow
          key={row.id}
          hover
          tabIndex={-1}
        >
          {Object.keys(row).map((el, i) => {
            //id 
            if (i === 0) return; 
            
            //first name and last name
            if (i === 1 || i === 2) {
              return <TableCell component="th" id={labelId} scope="row">
                {row[el]}
              </TableCell>
            } else {
              return (<TableCell align="right">
                <StandardDisplayColor score={row[el]}/>
              </TableCell>)
            }
          })}
        </TableRow>
      );
    });
                  
  // // if you want the mastery map to be the same size when there are less rows
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  // const formatedEmptyRows = emptyRows > 0 && (
  //   <TableRow style={{ height: 49 * emptyRows }}>
  //     <TableCell colSpan={6} />
  //   </TableRow>
  // )

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table
            aria-labelledby="tableTitle"
            className={classes.table}
            size={dense ? 'small' : 'medium'}
            padding={'none'}
          >
            <EnhancedTableHead
              headRows={headRows}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
              <TableBody>
                {formatedRows}
              </TableBody>
            </Table>
        </div>
        <TablePagination
          backIconButtonProps={{
              'aria-label': 'Previous Page',
          }}
          component="div"
          count={rows.length}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
