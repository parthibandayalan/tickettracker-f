import React, { useEffect, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TicketService from "../services/TicketService/TicketService";

const useStyles = makeStyles((theme) => ({
  cBox: {
    display: "inline"
  },
  childBox: {
    display: "inline-block"
  }
}));

export default function EditComponent(props) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);

  const [savedValue, setSavedValue] = useState("default value");
  const [currentValue, setCurrentValue] = useState("current value");

  const [currentLabel, setCurrentLabel] = useState("current label");
  const [savedLabel, setSavedLabel] = useState("saved label");

  
  const { passedValue,passedId,passedColumn,items,passedLabel } = props;
  /*
  const currencies = [
    {
      value: "USD",
      label: "$"
    },
    {
      value: "EUR",
      label: "€"
    },
    {
      value: "BTC",
      label: "฿"
    },
    {
      value: "JPY",
      label: "¥"
    }
  ];*/

  const handleChange = (event) => {
    setCurrentValue(event.target.value);
    const { myLabel } = event.currentTarget.dataset;
    //console.log(myLabel) 
    setCurrentLabel(myLabel);
  };

  useEffect(() => {
    setSavedValue(passedValue);
    setCurrentValue(passedValue);
    setSavedLabel(passedLabel);
    setCurrentLabel(passedLabel);
  }, []);

  const onClickSave = () => {
    setSavedValue(currentValue);
    setSavedLabel(currentLabel);
    TicketService.updateTicketById(passedId,passedColumn,currentValue).then(response => {            
      //this.setState({ ticket: response });
      //this.setState({ ticketReceived: true });
      console.log(response);
      //console.log(this.state.ticket);
      //console.log(this.state.ticketReceived);
  });        

    setEditMode(false);
  };

  const onClickCancel = () => {
    setCurrentValue(savedValue);
    setCurrentLabel(savedLabel);
    setEditMode(false);
  };

  //

  return editMode ? (
    <>
      <Box className={classes.cBox}>
        <Box className={classes.childBox}>
          <TextField select value={currentValue} onChange={handleChange}>
            {items.map((option) => (
              <MenuItem  key={option.label} value={option.value} data-my-label={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box className={classes.childBox}>
          <Button>
            <SaveIcon onClick={onClickSave} />
          </Button>
        </Box>
        <Box className={classes.childBox}>
          <Button>
            <CancelIcon onClick={onClickCancel} />
          </Button>
        </Box>
      </Box>
    </>
  ) : ( 
    <>
      <Box className={classes.cBox}>
        <Box className={classes.childBox}>
        <TextField  id="textField1" value={savedLabel}  multiline
    InputProps={{ readOnly: true }} />          
        </Box>
        <Box className={classes.childBox}>
          <Button
            onClick={() => {
              setEditMode(true);
            }}
          >
            <EditIcon />
          </Button>
        </Box>
        <Box visibility="hidden" className={classes.childBox}>
          <Button hidden>
            <CancelIcon onClick={onClickCancel} />
          </Button>
        </Box>
      </Box>
    </>
  );
}
