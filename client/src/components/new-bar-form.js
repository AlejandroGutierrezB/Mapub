import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import Grid from "@material-ui/core/Grid";

import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';


import React, { useState}  from 'react';
import { useForm, Controller } from 'react-hook-form'

import { createBar } from '../API.js'



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
    margin: 2,
  },
  button: {
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));




export default function RecipeReviewCard ({ addBar, setAddBar, setSelectedBar, handleShowForm, onClose }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const classes = useStyles();
  const { register, handleSubmit, control} = useForm()

  const onSubmit = async (data) => {
    try {
      console.log('data: ',data);
      //roundup 6 decimals
      //round the beer price also to a positive number to the 0.05
      setLoading(true);
      data.longitude = addBar.longitude;
      data.latitude = addBar.latitude;
      await createBar(data);
      onClose()
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };


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
      {/* autocomplete="off" in production */}
      { error ? <h3 className="error">{error}</h3> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <TextField
        inputRef={
          register({
            pattern: {
              value: /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/i,
              message: 'No especial carracters alloud'
            }
          })
        }
        required name="barName" label="Bar Name" variant="outlined" margin="dense" fullWidth="true"/>
       </CardContent>
      <CardContent>
        <TextField
          inputRef={register}
          id="openHour"
          label="Open Hour"
          name="openHour"
          type="time"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          InputLabelProps={{
             shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <TextField
          inputRef={register}
          id="closeHour"
          label="Close Hour"
          name="closeHour"
          type="time"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          InputLabelProps={{
             shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </CardContent>
      <CardActions >
        <Grid container justify="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
          {loading ? 'Loading...' : 'Save Bar'}
            </Button>
        </Grid>
      </CardActions>
      </form>
    </Card>
  );
}