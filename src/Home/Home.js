import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { Link } from "react-router-dom";

import logo from './home-doot.webp';

function Home() {
  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <Card>
            <CardMedia
              component="img"
              sx={{ padding: '1em 1em 0 1em', objectFit: 'contain' }}
              image={logo}
              alt="doot"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Begin your spooktacular movie list 🎬🎃
              </Typography>
              <Typography variant="body2" color="text.secondary">
                With thousands of movies to choose from, you're bound to be in
                for a fright!
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained">
              <Link to={`movies/add`}>Begin</Link>
              </Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>        
      </Grid>
    </div>
  );
}

export default Home;
