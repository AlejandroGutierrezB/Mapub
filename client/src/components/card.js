import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';





const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 'auto',
    marginTop: theme.spacing(10),
    zIndex: 10,
    position: 'relative'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function RecipeReviewCard ({ bar, setTogglePopup, setSelectedBar }) {
  const classes = useStyles();

  //TODO handle edit button
  // const [expanded, setExpanded] = React.useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };


  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton
            onClick={() => {
              setTogglePopup({});
              setSelectedBar(null);
            }}
            aria-label="close">
            <Close />
          </IconButton>
        }
        title={bar.barName}
        subheader={`${(!bar.openHour ? '' : (`${bar.openHour} - ${bar.closeHour}`))}`} //properties.
      />
      <CardMedia
        className={classes.media}
        image="https://picsum.photos/200/300/"
        title="Paella dish" // bar name
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          🔼This will be a list with the beers
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="edit bar">
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}