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
import ProjectService from "../../services/ProjectService/ProjectService";

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
  //const id = this.props.match.params.id;

  const [tickets, setTickets] = useState([]);
  const [ticketsLength, setTicketsLength] = useState(0);

  const deleteTicketClicked = (id) => {
    //let username = AuthenticationService.getLoggedInUserName()
    //console.log(id + " " + username);
    TicketService.deleteTicketById(id).then(
      setTicketsLength(ticketsLength - 1)
      /*response => {
                //this.setState({ message: `Delete of Ticket ${id} Successful` })
                //this.refreshTodos()
            }*/
    );
  };

  const username = localStorage.getItem("username");

  useEffect(() => {
    ProjectService.getProjectByProjectManager(username).then((response) => {
      let tempTickets = [];
      for (let eachProject of response) {
        tempTickets.push(...eachProject.tickets);
      }
      setTickets([]);
      setTickets(tempTickets);
    });
  }, [ticketsLength, username]);

  return (
    <div align="center">
      <Card className={classes.table}>
        <TableContainer component={Paper}>
          <Typography
            className={classes.myTypography}
            align="center"
            variant="h5"
          >
            Managed Tickets
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
                <TableCell align="center">Delete</TableCell>
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
                          pathname: "/viewticketasmanager",
                          state: { ticketId: ticket.id },
                        })
                      }
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      className="btn btn-warning"
                      onClick={() => deleteTicketClicked(ticket.id)}
                    >
                      Delete
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
