import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    zIndex: 10,
    position: 'relative',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(4),
      padding: theme.spacing(3)
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(1)
  }
}));

export default function NewBarForm ({ setAddBar, setSelectedBar, handleShowForm }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Payment Card
          </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <IconButton
                onClick={() => {
                  setAddBar(null);
                  setSelectedBar(null);
                  handleShowForm();
                }}
                aria-label="close">
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="barName"
                label="Bar name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="barAddress"
                label="Bar address"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField required id="OpenHour" label="Open hour" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="CloseHour"
                label="Close Hour"
                fullWidth
              />
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              submit
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment >
  );
}
