import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import EditComponent from "../../components/EditComponent";
import EditDropDownComponent from "../../components/EditDropDownComponent";
import TicketService from "../../services/TicketService/TicketService";
import ProjectService from "../../services/ProjectService/ProjectService";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cBox: {
    display: "inline"
  },
  childBox: {
    display: "inline-block"
  },
  table: {
    minWidth: 400,
    maxWidth: 500,
    display: "inline-block"
  }
}));

export default function TicketDetails(props) {

  const [ticket,setTicket] = useState([]);
  const [loaded,setLoaded] = useState(false);
  const [contributors,setContributors] = useState([]);  

  const location = useLocation();
  const ticketId = location.state.ticketId;

  //const mapUser = [];

  useEffect(()=>{
    TicketService.getTicketById(ticketId).then(response => {
      console.log("Fetching Ticket : ");
      console.log(response);
      setTicket(response);
      
      //console.log("Here is the ticket : "+ticket.id);

      ProjectService.getProjectById(response.project.id).then( rep => {
        //setContributors(rep.contributors);
        console.log(rep.contributors);
        let tempUsers = [];
        Object.keys(rep.contributors).map(key => (                    
          tempUsers.push({value : rep.contributors[key].id,label:rep.contributors[key].username})                    
          ));

          setContributors(tempUsers);

      })
      setLoaded(true);
    });

  },[ticketId]);

  const severity = [
    {
      value: "Low",
      label: "Low"
    },
    {
      value: "Medium",
      label: "Medium"
    },
    {
      value: "High",
      label: "High"
    }
  ];

  const status = [
    {
      value: "New",
      label: "New"
    },
    {
      value: "Assigned",
      label: "Assigned"
    },
    {
      value: "Open",
      label: "Open"
    },
    {
      value: "Investigation",
      label: "Investigation"
    },
    {
      value: "Resolved",
      label: "Resolved"
    },
    {
      value: "Closed",
      label: "Closed"
    }
  ];

  const classes = useStyles();
  return (
    loaded ? <>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Ticket Id</TableCell>
              <TableCell align="center"> {ticket.id}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">Ticket Name</TableCell>
              <TableCell align="center">{ticket.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">TicketDetails</TableCell>
              <TableCell align="right">
                <EditComponent passedValue={ticket.description} passedColumn="description" passedId={ticket.id}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Severity</TableCell>
              <TableCell align="right">
                <EditDropDownComponent passedValue={ticket.severity} items={severity} passedColumn="severity" passedId={ticket.id} passedLabel={ticket.severity}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">
                <EditDropDownComponent passedValue={ticket.status} items={status} passedColumn="status" passedId={ticket.id} passedLabel={ticket.status}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Created By </TableCell>
              <TableCell align="center">{ticket.createdUser.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" >Assigned To </TableCell>
              <TableCell align="right">
                <EditDropDownComponent passedValue={ticket.assignedUser != null ? ticket.assignedUser.id:"" } items={contributors} passedColumn="assignedUser" passedId={ticket.id} passedLabel={ticket.assignedUser != null ? ticket.assignedUser.username:"" }/>
              </TableCell>              
            </TableRow>
            <TableRow>
              <TableCell align="center">Project Id</TableCell>
              <TableCell align="center">{ticket.project.id}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
    </TableContainer>
    </>:<>Loading</>
  );
}
