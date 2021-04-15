import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TicketService from "../../services/TicketService/TicketService";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    maxWidth: 1000,
  },
  myTypography: {
    color: "#025f8c",
  },
}));

export default function ListManagedTickets() {
  const history = useHistory();
  const classes = useStyles();

  const [tickets, setTickets] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    TicketService.getTicketAsContributor(username).then((response) => {
      console.log(response);
      setTickets([]);
      setTickets(response);
    });
  }, [username]);

  return (
    <div align="center">
      <Card className={classes.table}>
        <TableContainer component={Paper}>
          <Typography
            className={classes.myTypography}
            align="center"
            variant="h5"
          >
            Assigned Tickets
          </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Ticket Id</TableCell>
                <TableCell align="center">Ticket Name</TableCell>
                <TableCell align="center">Ticket Description</TableCell>
                <TableCell align="center">Severity</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">View Ticket Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell component="th" scope="row">
                    {ticket.id}
                  </TableCell>
                  <TableCell align="center">{ticket.title}</TableCell>
                  <TableCell align="center">{ticket.description}</TableCell>
                  <TableCell align="center">{ticket.severity}</TableCell>
                  <TableCell align="center">{ticket.status}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() =>
                        history.push({
                          pathname: "/ticket",
                          state: { ticketId: ticket.id },
                        })
                      }
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
