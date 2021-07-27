import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
    maxWidth: 600,
  },
  myTypography: {
    color: "#025f8c",
  },
}));

export default function HomeComponent() {
  const classes = useStyles();
  const adminItemsList = [
    "To View and Edit projects click View Projects",
    "To Approve Users Click 'Approve Users'",
  ];
  const managerItemsList = [
    "To View and Edit your projects click 'Managed Projects'",
    "To View , Edit and Assign Tickets Click 'View Tickets'",
    "To Create Projects Click 'Create Projects'",
    "To Create Tickets Click 'Create Tickets'",
  ];
  const userItemsList = [
    "To View and Edit Ticket Click 'View Tickets'",
    "To Create Ticket Click 'Create Tickets'",
  ];

  var itemsList = [];
  var accountType;

  if (localStorage.getItem("roles").includes("Admin")) {
    itemsList = adminItemsList;
    accountType = "Admin";
  } else if (localStorage.getItem("roles").includes("Manager")) {
    itemsList = managerItemsList;
    accountType = "Manager";
  } else if (localStorage.getItem("roles").includes("Contributor")) {
    itemsList = userItemsList;
    accountType = "Contributor";
  }

  return (
    <div align="center">
      <Card className={classes.table}>
        <Typography variant="h5">
          {" "}
          You have successfully logged into Ticket Tracker as{" "}
        </Typography>
        <Typography color="secondary" variant="h5">
          {accountType}
        </Typography>
        <List>
          {itemsList.map((item, index) => {
            return (
              <ListItem key={index}>
                <ListItemText primary={item} variant="body1" />
              </ListItem>
            );
          })}
        </List>
      </Card>
    </div>
  );
}
