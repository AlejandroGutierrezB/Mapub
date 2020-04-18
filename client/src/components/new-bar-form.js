import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';


import MaterialUIPickers from './date-picker.js';

import Selector from './selector.js'

import React from 'react';





const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 'auto',
    marginTop: theme.spacing(10),
    zIndex: 10,
    position: 'relative',
    justifyContent: 'center'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  buttons: {
    display: "flex",
  },
  button: {
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
}));

export default function RecipeReviewCard ({ setAddBar, setSelectedBar, handleShowForm }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton
            onClick={() => {
              setAddBar(null);
              setSelectedBar(null);
              handleShowForm();
            }}
            aria-label="close">
            <Close />
          </IconButton>
        }
        title="Add a new Bar"
        subheader="Cheers to that one🍻"
      />
      <CardContent>
        <TextField required id="BarName" label="Bar Name" variant="outlined" margin="dense" fullWidth="true"/>
      </CardContent>
      <CardContent>
      <Grid container justify="center">
        <MaterialUIPickers label="Open hour"/>
        <MaterialUIPickers label="Close hour"/>
        <TextField
          type="Number"
          required
          label="Price"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            min: 0,
            step: 0.5,
            startAdornment: <InputAdornment position="start">€</InputAdornment>
          }}
          variant="outlined"
        />
        <Selector/>
      </Grid>
      </CardContent>
      <CardActions >
        <Grid container justify="center">
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            Add beer
            </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Save Bar
            </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}