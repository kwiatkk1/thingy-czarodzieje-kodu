import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import thingyImage from "assets/thingy-product.png";
import {useDeviceCollection} from "module/firestore/firebase";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: theme.spacing(3)
  },
  table: {
    minWidth: 650,
  },
  thingyImage: {
    marginTop: theme.spacing(4)
  }
}));

export default function StatusView() {
  const classes = useStyles();
  const [value, loading, error] = useDeviceCollection("deviceStatus");

  return (
    <Paper className={classes.root}>
      <img src={thingyImage} className={classes.thingyImage} alt="" />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nazwa</TableCell>
              <TableCell align="right">Poziom baterii</TableCell>
              <TableCell align="right">Wersja</TableCell>
              <TableCell align="right">Ostatnio oktywny</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .sort((a,b) => a.id.localeCompare(b.id))
              .map(doc => {
                const date = doc.lastContact
                  ? new Date(Number(doc.lastContact.seconds) * 1000)
                  : null;
                return (
                  <TableRow key={doc.id}>
                    <TableCell component="th" scope="row">
                      {doc.id}
                    </TableCell>
                    <TableCell align="right">{doc.battery}%</TableCell>
                    <TableCell align="right">{doc.firmware ? doc.firmware : '-'}</TableCell>
                    <TableCell align="right">{date ? (date.toLocaleString("pl")) : null}
                    </TableCell>
                  </TableRow>
                );
              }
              )}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
