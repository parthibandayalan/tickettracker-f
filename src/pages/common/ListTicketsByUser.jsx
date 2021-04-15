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
  Link,
  Button,
  MenuItem,
  TextField,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import ProjectService from "./../../services/ProjectService/ProjectService";
import TicketService from "./../../services/TicketService/TicketService";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default function ListTicketsByUser() {
  const id = 3;

  const history = useHistory();
  const classes = useStyles();
  //const id = this.props.match.params.id;

  const [tickets, setTickets] = useState([]);
  const [ticketsLength, setTicketsLength] = useState(0);

  const [selection, setSelection] = useState("");

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

  async function fetchAllTickets() {
    try {
      let response = {};
      let tempTickets = [];
      response = await TicketService.getTicketAsCreator(id);
      tempTickets.push(...response);
      response = await TicketService.getTicketAsContributor(id);
      tempTickets.push(...response);
      let projects = await ProjectService.getProjectByProjectManager(id);
      for (let eachProject of projects) {
        tempTickets.push(...eachProject.tickets);
      }
      //arr.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
      let uniqueTickets = tempTickets.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );
      setTickets(uniqueTickets);
    } catch (e) {
      console.log(e);
    }
  }

  /*async function fetchTicketAsProjectManager() {
    try {
      let projects = [];
      let tempTickets = [];
      projects = await ProjectService.getProjectByProjectManager(id);
      console.log(projects);
      for (let eachProject of projects) {
        tempTickets.push(...eachProject.tickets);
      }
      //console.log(tempTickets);
      return tempTickets;
    } catch (e) {
      console.log(e);
    }
  }*/

  useEffect(() => {
    fetchOptions(selection);
    //fetchTicketAsProjectManager();
    /*let tempTickets = [];
    TicketService.getTicketAsCreator(id).then((response) => {
      //console.log(response);
      tempTickets.push(...response);
    });
    TicketService.getTicketAsContributor(id).then((response) => {
      //console.log(response);
      tempTickets.push(...response);
    });
    setTickets(tempTickets);
    console.log(tempTickets);*/
  }, [ticketsLength]);

  /*switch(param) {
    case 'foo':
      return 'bar';
    default:
      return 'foo';
  } */

  const fetchOptions = (ticketType) => {
    setSelection(ticketType);
    console.log(ticketType);
    switch (ticketType) {
      case "contributor":
        console.log("inside contributor");
        TicketService.getTicketAsContributor(id).then((response) => {
          console.log(response);
          setTickets([]);
          setTickets(response);
        });
        break;
      case "creator":
        console.log("inside creator");
        TicketService.getTicketAsCreator(id).then((response) => {
          console.log(response);
          setTickets([]);
          setTickets(response);
        });
        break;
      case "project manager":
        ProjectService.getProjectByProjectManager(id).then((response) => {
          let tempTickets = [];
          for (let eachProject of response) {
            tempTickets.push(...eachProject.tickets);
          }
          setTickets([]);
          setTickets(tempTickets);
        });
        break;
      case "all":
        console.log("inside all");
        fetchAllTickets();
        break;
      default:
        break;
    }
  };

  const handleTicketType = (event) => {
    const ticketType = event.target.value;
    fetchOptions(ticketType);
  };

  return (
    <div>
      <Card>
        <TableContainer component={Paper}>
          <Typography variant="h6" id="tableTitle" component="div">
            Tickets For
          </Typography>

          <TextField select onChange={handleTicketType} value={selection}>
            <MenuItem value="">Select ...</MenuItem>
            <MenuItem value="creator">As Creator</MenuItem>
            <MenuItem value="contributor">As Contributor</MenuItem>
            <MenuItem value="project manager">As Project Manager</MenuItem>
            <MenuItem value="all">All</MenuItem>
          </TextField>

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
                          pathname: "/ticket",
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
