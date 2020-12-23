import React, {useEffect,useState} from 'react';
import {    
    Card,
    Typography,    
    TableContainer,Paper,Table, TableRow,TableHead,TableCell,TableBody,Link,Button
  } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import ProjectService from "./../../services/ProjectService/ProjectService";
import TicketService from "./../../services/TicketService/TicketService";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
}))

export default function ListTickets() {

    const history = useHistory();
    const classes = useStyles();
    //const id = this.props.match.params.id;    
    const location = useLocation();

    const [tickets, setTickets] = useState([]);
    const [ticketsLength,setTicketsLength] = useState(0);



    useEffect(() => {
        ProjectService.getProjectById(location.state.projectId).then(response => {
            console.log(response);
            setTickets(response.tickets);
            setTicketsLength(response.tickets.length);
            //this.setState({ projects: response });
        });
    },[location,ticketsLength]);

    const deleteTicketClicked = (id) => {
        //let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        TicketService.deleteTicketById(id)
            .then(
                setTicketsLength(ticketsLength-1)
                /*response => {
                    //this.setState({ message: `Delete of Ticket ${id} Successful` })
                    //this.refreshTodos()
                }*/
            )
    };

    return (
        <div>
            <Card>
                <TableContainer component={Paper}>
                    <Typography variant="h6" id="tableTitle" component="div">
                        Tickets For {location.state.projectId}
                    </Typography>
                    <Table className={classes.table} >
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
                        {
                            tickets.map(ticket => <TableRow key={ticket.id}>
                                <TableCell component="th" scope="row">{ticket.id}</TableCell>
                                <TableCell align="center">{ticket.title}</TableCell>
                                <TableCell align="center">{ticket.description}</TableCell>
                                <TableCell align="center">{ticket.severity}</TableCell>
                                <TableCell align="center">{ticket.status}</TableCell>                                
                                <TableCell align="center"><Button onClick={()=> history.push({pathname: '/ticket',
                                                                                              state: { ticketId: ticket.id }
                                                                                              ,})}>View</Button></TableCell>
                                <TableCell align="center"><Button className="btn btn-warning" onClick={()=>deleteTicketClicked(ticket.id)}>Delete</Button></TableCell>
                            </TableRow>
                            )
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}