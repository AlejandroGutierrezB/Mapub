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


import React from 'react';
import { useForm, Controller } from 'react-hook-form'




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




export default function RecipeReviewCard ({ addBar, setAddBar, setSelectedBar, handleShowForm }) {
  const classes = useStyles();
  const { register, handleSubmit, control, errors} = useForm()

  const onSubmit = data => { console.log(data, addBar) }


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
      {/* state1 */}
      {/* autocomplete="off" in production */}
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
      {/* state2  should include form control for all fields completed*/}
      <CardContent>
        <TextField mx="auto" inputRef={register} required name="beerName"  label="Beer Brand" variant="outlined" margin="dense" fullWidth="true"/>
      </CardContent>
      <CardContent>
      <Grid container direction="row" justify="space-even" alignItems="center">
        <TextField
          margin="dense"
          inputRef={register({ pattern: /^[0-9]+$/i, min: 0.5, message: 'The value should be a number over 0.5 €' })}
          required
          label="Price"
          name="price"
          size="small"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            type:"Number",
            placeholder:"0",
            startAdornment: <InputAdornment position="start">€</InputAdornment>
          }}
          variant="outlined"
        />
        <Controller
          as={
            <Select>
              <MenuItem value={0.25}>0,25L</MenuItem>
              <MenuItem value={0.33}>0,33L</MenuItem>
              <MenuItem value={0.5}>0,5L</MenuItem>
            </Select>
          }
          name="size"
          control={control}
          defaultValue={0.25}
          displayEmpty={true}
          required
        />
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
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Save Bar
            </Button>
        </Grid>
      </CardActions>
      </form>
    </Card>
  );
}