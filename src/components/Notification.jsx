import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
//import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     top: theme.spacing(9),
//   },
// }));

export default function Notification(props) {
  const { notify, setNotify } = props;
  //const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
