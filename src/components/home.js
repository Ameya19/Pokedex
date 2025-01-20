import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import pokeball from "./../images/pokeball.png";
import pokeBackground from "./../images/pokeballBackground.jpeg";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const useStyles = makeStyles({
  buttonStep: {
  width: "150px",
  height: "49px",
  backgroundImage: `url(${pokeBackground})`
  }
})

function Home() {
    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <div className="App">
          <Helmet>
            <title>Home</title>
          </Helmet>
            <header className="App-header">
                <img src={pokeball} className="pokeball-logo" alt="logo" />
                <h1>PokeDex</h1>
                <Button variant="contained" className={classes.buttonStep} onClick={() => navigate('/pokedex')}> Get Started! </Button>
            </header>
        </div>
  );
}

export default Home;