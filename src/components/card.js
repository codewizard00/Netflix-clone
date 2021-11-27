import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@material-ui/core';
import {Link} from "react-router-dom"
export default function Carde({item}) {
    const poster= item.poster_path;
  return (
      <div style={{margin:'auto'}}>
    <Card sx={{ maxWidth: 300,}} style={{margin:"2% 0% 2% 2%"}}>
      <CardMedia
        component="img"
        height="260"
        image={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
        alt={item.title}
      />
      <CardContent>
          {item.media_type==='tv'?
        <Typography gutterBottom variant="h5" component="div">
        {item.name}
       
      </Typography> :
      <Typography gutterBottom variant="h5" component="div">
      {item.title}
    </Typography> 
        }
      </CardContent>
      <CardActions>
          {item.media_type==='tv'?
        <Link  to={`/tv/${item.id}`} style={{textDecoration:"none"}} ><Button size="small" color="secondary" variant="contained"  >Learn More</Button>
        </Link>:
        <Link to={`/movie/${item.id}`} style={{textDecoration:'none'}} ><Button size="small" variant='contained' color="secondary"  >Learn More</Button>
        </Link>}
      </CardActions>
    </Card>
    </div>
  );
}
