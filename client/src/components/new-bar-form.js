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


import MaterialUIPickers from './date-picker.js';

import Selector from './selector.js'

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
  },
  button: {
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
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
        <TextField inputRef={register} required name="barName" label="Bar Name" variant="outlined" margin="dense" fullWidth="true"/>
        {/* <Controller as={<MaterialUIPickers/>} name="openHour" control={control} defaultValue={null} /> */}
        {/* <MaterialUIPickers inputRef={register} name="openHour" label="Open hour"/> */}
        {/* <MaterialUIPickers inputRef={register} name="closeHour" label="Close hour"/> */}
      </CardContent>
      {/* state2 */}
      <CardContent>
          <TextField mx="auto" inputRef={register} required name="beerName"  label="Beer Brand" variant="outlined" margin="dense"/>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <TextField
          margin="dense"
          inputRef={register({ pattern: /^[0-9]+$/i, min: 0.5 })}
          required
          label="Price"
          name="price"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            type:"Number",
            placeholder:"0",
            startAdornment: <InputAdornment position="start">€</InputAdornment>
          }}
          variant="outlined"
        />
        {/* <Selector inputRef={register} required name="size"/> */}
        {/* <Controller
        as={<Selector/>}
        name="size"
        required
        control={control}
        rules={{ required: true }}
        onChange={(selected) => {
          console.log('selected: ',selected);
        }}
        defaultValue={""}
      /> */}
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