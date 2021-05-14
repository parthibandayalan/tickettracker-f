import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItemText,
  ListItem,
  Divider,
  Avatar,
  ListItemAvatar,
  makeStyles,
  TextField,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import TicketService from "../services/TicketService/TicketService";
import Notification from "./Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "50ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  myTypography: {
    color: "#025f8c",
  },
}));

export default function CommentComponent(props) {
  const classes = useStyles();

  const { ticket } = props;

  const [comments, setComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState(0);
  const [message, setMessage] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // const data = [
  //   { name: "Travis Howard", message: "Comment 1" },
  //   { name: "Sandra Adams", message: "Comment 2" },
  //   { name: "Travis Howard", message: "Comment 3" },
  // ];

  const onChange = (event) => {
    setMessage(event.target.value);
  };

  const onSend = () => {
    //console.log("Send Message : " + message);
    TicketService.addComment(
      ticket.id,
      localStorage.getItem("username"),
      message
    )
      .then((response) => {
        //console.log("Comments : " + response);
        // comments.push({
        //   name: localStorage.getItem("username"),
        //   message: message,
        // });
        //setComments(comments);
        setNotify({
          isOpen: true,
          message: "Comment Added",
          type: "success",
        });
        setMessage("");
        setCommentsLength(comments.length - 1);
      })
      .catch(() => {
        setNotify({
          isOpen: true,
          message: "Project Creation Failed",
          type: "error",
        });
      });
  };

  useEffect(() => {
    console.log("Use Effect Launched");
    //console.log("Ticket : " + JSON.stringify(ticket));

    TicketService.getTicketById(ticket.id)
      .then((response) => {
        console.log(response.comments);
        const tempData = [];
        Object.keys(response.comments).map((key) => {
          console.log({ key });
          tempData.push({
            key: key,
            name: response.comments[key].author.fullname,
            message: response.comments[key].message,
          });
          console.log({ tempData });
        });
        console.log("Comments : " + JSON.stringify(tempData));
        setComments(tempData);
        setCommentsLength(tempData.length);
      })
      .catch((response) => {
        console.log(response);
      });
  }, [commentsLength]);

  return (
    <div>
      <Card>
        <Typography
          align="center"
          className={classes.myTypography}
          variant="h5"
        >
          Comments
        </Typography>
        <List className={classes.root} align="left">
          {comments.map((eachItem) => (
            <ListItem alignItems="flex-start" key={eachItem.key}>
              <ListItemAvatar>
                <Avatar>{eachItem.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={eachItem.message}
                secondary={<React.Fragment> - {eachItem.name}</React.Fragment>}
              />
              <Divider variant="inset" component="li" />
            </ListItem>
          ))}
        </List>
        <TextField
          id="outlined-basic"
          label="Your Comment"
          variant="outlined"
          onChange={onChange}
          value={message}
        />
        <IconButton
          aria-label="Send"
          className={classes.margin}
          onClick={onSend}
        >
          <SendIcon fontSize="large" />
        </IconButton>

        <Divider variant="inset" component="li" />
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
