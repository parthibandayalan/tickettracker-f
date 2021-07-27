import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService/UserService";
import {
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  Card,
  Paper,
  Typography,
  TableBody,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default function ListUnapprovedUsers() {
  const [users, setUsers] = useState([]);
  const [usersLength, setUsersLength] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    UserService.getUnApprovedUser()
      .then((response) => {
        console.log(response);
        setUsersLength(response.data.length);
        setUsers(response.data);
        //this.setState({ projects: response });
      })
      .catch((response) => {
        setUsersLength(0);
        setUsers([]);
      });
  }, [usersLength]);

  const approveUsersCall = (selectedId) => {
    let userIds = [];
    userIds.push(selectedId);
    UserService.approveUsers(userIds).then(setUsersLength(usersLength - 1));
  };

  return (
    <div>
      <Card>
        <TableContainer component={Paper}>
          <Typography variant="h6" id="tableTitle" component="div">
            Un-Approved Users
          </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>User Id</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Created On</TableCell>
                <TableCell align="center">Approved</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover={true}>
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                  <TableCell align="center">{user.createdOn}</TableCell>
                  <TableCell align="center">
                    {JSON.stringify(user.approved)}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => approveUsersCall(user.id)}>
                      Approve
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
