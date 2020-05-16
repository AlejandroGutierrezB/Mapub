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

import img from '../icons/mnm-all-XDW56oKSCHw-unsplash (1).jpg';
import BeerTable from './list.js';







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

export default function RecipeReviewCard ({ bar, setTogglePopup, setSelectedBar, setEditForm, editForm, setDragPanState, dragPanState }) {
  const classes = useStyles();

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
        // image="https://picsum.photos/200/300/"
        image={img}
        title="beer"
      />
      {bar.beerList.length ?
        <BeerTable beerList={bar.beerList} />
        : null
      }
      {/* {bar.tlf ?
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            ✆{bar.tlf}
          </Typography>
        </CardContent>
        : null
      } */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="edit bar">
          <EditIcon
            onClick={() => {
              setSelectedBar(null);
              setEditForm(!editForm);
              setDragPanState(!dragPanState);
            }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}