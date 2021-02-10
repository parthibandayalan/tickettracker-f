import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
} from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";
import { Route } from "react-router-dom";
import ListProjects from "./ListProjects";
import { useHistory, Switch } from "react-router-dom";
import ListTickets from "./ListTickets";
import { logoutUser, refreshToken } from "../../redux/ducks/authentication";
import { useDispatch } from "react-redux";
import TicketDetails from "./TicketsDetailsPage";
import CreateTicket from "../common/CreateTicket";
import CreateProject from "../common/CreateProject";
import ListUnapprovedUsers from "../common/ListUnapprovedUsers";
import ListTicketsByUser from "../common/ListTicketsByUser";

const drawerWidth = 240;
const drawerHeight = 50;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  title: {
    flexGrow: 1,
  },
  contentIn: {
    marginTop: drawerHeight,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Dashboard({ match }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  /*useEffect(() => {
    setInterval(()=>{
      console.log("Timer Tick");
      dispatch(refreshToken());
  },5000)
  });*/
  /////////////////////////////////////
  const adminItemsList = [
    {
      text: "View Projects",
      icon: <InboxIcon />,
      onClick: () => history.push("/"),
    },
    {
      text: "Create Ticket",
      icon: <MailIcon />,
      onClick: () => history.push("/ticket/create"),
    },
    {
      text: "Create Project",
      icon: <MailIcon />,
      onClick: () => history.push("/project/create"),
    },
    {
      text: "Unapproved User",
      icon: <MailIcon />,
      onClick: () => history.push("/users/unapproved"),
    },
    {
      text: "List Tickets By User",
      icon: <MailIcon />,
      onClick: () => history.push("/ticketsbyuser"),
    },
  ];

  const managerItemsList = [
    {
      text: "View Projects",
      icon: <InboxIcon />,
      onClick: () => history.push("/"),
    },
    {
      text: "Create Ticket",
      icon: <MailIcon />,
      onClick: () => history.push("/ticket/create"),
    },
    {
      text: "Create Project",
      icon: <MailIcon />,
      onClick: () => history.push("/project/create"),
    },
    {
      text: "List Tickets By User",
      icon: <MailIcon />,
      onClick: () => history.push("/ticketsbyuser"),
    },
  ];

  const userItemsList = [
    {
      text: "View Projects",
      icon: <InboxIcon />,
      onClick: () => history.push("/"),
    },
    {
      text: "Create Ticket",
      icon: <MailIcon />,
      onClick: () => history.push("/ticket/create"),
    },
    {
      text: "List Tickets By User",
      icon: <MailIcon />,
      onClick: () => history.push("/ticketsbyuser"),
    },
  ];
  //////////////////////////////////

  var itemsList = [];

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (localStorage.getItem("roles").includes("Admin")) {
    itemsList = adminItemsList;
  } else if (localStorage.getItem("roles").includes("Manager")) {
    itemsList = managerItemsList;
  } else if (localStorage.getItem("roles").includes("Contributor")) {
    itemsList = userItemsList;
  }

  // const itemsList = [
  //   {
  //     text: "View Projects",
  //     icon: <InboxIcon />,
  //     onClick: () => history.push("/"),
  //   },
  //   {
  //     text: "Create Ticket",
  //     icon: <MailIcon />,
  //     onClick: () => history.push("/ticket/create"),
  //   },
  //   {
  //     text: "Create Project",
  //     icon: <MailIcon />,
  //     onClick: () => history.push("/project/create"),
  //   },
  //   {
  //     text: "Unapproved User",
  //     icon: <MailIcon />,
  //     onClick: () => history.push("/users/unapproved"),
  //   },
  //   {
  //     text: "List Tickets By User",
  //     icon: <MailIcon />,
  //     onClick: () => history.push("/ticketsbyuser"),
  //   },
  // ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} align="center">
            Ticket Tracker
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.contentIn}>
          <Switch>
            <Route exact path={match.url + `project`} component={ListTickets} />
            <Route
              exact
              path={match.url + `ticket`}
              component={TicketDetails}
            />
            <Route
              exact
              path={match.url + `ticket/create`}
              component={CreateTicket}
            />
            <Route
              exact
              path={match.url + `project/create`}
              component={CreateProject}
            />
            <Route
              exact
              path={match.url + `users/unapproved`}
              component={ListUnapprovedUsers}
            />
            <Route
              exact
              path={match.url + `ticketsbyuser`}
              component={ListTicketsByUser}
            />
            <Route exact path={match.url + "/"} component={ListProjects} />
          </Switch>
        </div>
      </main>
    </div>
  );
}
