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
import Slider from '@material-ui/core/Slider';
import Grid from "@material-ui/core/Grid";
import EuroIcon from '@material-ui/icons/Euro';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';


import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { updateBar } from '../API.js';



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
  slider: {
    width: 150,
  },
}));


export default function EditBarForm ({ bar, setTogglePopup, addBar, setAddBar, setSelectedBar, handleShowForm, onClose, setEditBar, editBar, setEditForm, editForm, setDragPanState, dragPanState }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [beerList, setBeerList] = useState(bar.beerList);

  const classes = useStyles();
  const { register, handleSubmit, control, reset } = useForm();

  //Debugging
  // useEffect(() => {
  //   console.log('UseEffect', beerList);
  // }, [beerList]);

  const onSubmit = async (data) => {
    try {
      const newBeer = {
        beerName: data.beerName,
        price: data.price,
        size: data.size,
      };
      const barId = bar._id;
      console.log('newBeer: ', newBeer);
      updateBar(newBeer, barId);
      setLoading(true);
      onClose();
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
              setTogglePopup({});
              setSelectedBar(null);
              setEditForm(!editForm);
              setDragPanState(!dragPanState);
            }}
            aria-label="close">
            <Close />
          </IconButton>
        }
        title={bar.barName}
        subheader={`${(!bar.openHour ? '' : (`${bar.openHour} - ${bar.closeHour}`))}`} //properties.
      //subheader={beerList.length} //debugging.
      />
      {error ? <h3 className="error">{error}</h3> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <TextField mx="auto" inputRef={register} required name="beerName" label="Beer Brand" variant="outlined" margin="dense" fullWidth={true} />
        </CardContent>
        <CardContent>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <div className={classes.slider}>
              <Typography id="input-slider" gutterBottom>
                Price
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <EuroIcon />
                </Grid>
                <Grid item xs>
                  <Controller
                    name="price"
                    control={control}
                    defaultValue={1.5}
                    onChange={([, value]) => value}
                    as={<Slider
                      valueLabelDisplay="on"
                      aria-labelledby="discrete-slider"
                      defaultValue={1.5}
                      min={0.5}
                      max={10}
                      step={0.25}
                    />}
                  />
                </Grid>
              </Grid>
            </div>
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
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              {loading ? 'Loading...' : 'Add Beer to Bar'}
            </Button>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
}