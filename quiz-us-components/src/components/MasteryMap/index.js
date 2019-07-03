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
  { id: 'standard1', numeric: true, disablePadding: false, label: 'Standard1' },
  { id: 'standard2', numeric: true, disablePadding: false, label: 'Standard2' },
  { id: 'standard3', numeric: true, disablePadding: false, label: 'Standard3' },
  { id: 'standard4', numeric: true, disablePadding: false, label: 'Standard4' },
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    function handleRequestSort(event, property) {
      console.log(event, property);
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

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar />
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                  headRows={headRows}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
              />
                <TableBody>
                  {stableSort(rows, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                          <TableRow
                              hover
                              tabIndex={-1}
                              key={row.id}
                          >
                            {Object.keys(row).map((el,i) => {
                              if (i === 0) return;
                              if (i === 1 || i === 2) {
                                return <TableCell component="th" id={labelId} scope="row">
                                  {row[el]}
                                </TableCell>
                              } else {
                                return <TableCell align="right">{row[el]}</TableCell>
                              }
                            })}
                          </TableRow>
                      );
                  })}
                  {/* if you want the mastery map to be the same size when there are less rows */}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>
              </Table>
          </div>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                  'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                  'aria-label': 'Next Page',
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
        />
      </div>
    );
}
