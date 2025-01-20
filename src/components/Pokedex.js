import React, { useState, useEffect } from "react";
import './pokedex.css';
import PokedexAppBar from "./pokedexAppBar";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { CircularProgress } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import Footer from './footer.js';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/joy/Autocomplete';

function Pokedex() {

    const [pokemons, setPokemons] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:960px)');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1025');
                const results = response.data.results;

                const detailedData = await Promise.all(
                    results.map(async (post) => {
                        const pokemonResponse = await axios.get(post.url);
                        return pokemonResponse.data;
                    })
                );
                console.log(detailedData);
                setPosts(results);
                setPokemons(detailedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error.message);
            }
        };

        fetchData();
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const getImageListItemSize = () => {
        if (isSmallScreen) {
            return { width: '45vw', height: '30vh' };
        } else if (isMediumScreen) {
            return { width: '22vw', height: '25vh' };
        } else {
            return { width: '15vw', height: '25vh' };
        }
    };

    const searchOnClick = (search) => {
        return () => {
            const pokemon = pokemons.find((pokemon) => pokemon.name === search);
            if (pokemon) {
                navigate('/pokedex/' + pokemon.id + '/');
            }
        }
    };

    return (
        <div id="pokedex">
            <Helmet>
                <title>Pokedex</title>
            </Helmet>
            <div className="pokedex-header">
                <PokedexAppBar />
            </div>
            <div className='search-bar'>
            <Autocomplete
                className="search-bar"
                placeholder="Pokemon"
                type="search"
                freeSolo
                disableClearable
                onChange={(event, value) => setSearch(value.toLowerCase())}
                options={posts.map((post) => capitalizeFirstLetter(post.name))}
                /><SearchIcon fontSize="large" onClick={searchOnClick(search)} sx={{color:"White", marginTop:"1%", marginLeft:"2%"}}/>
            </div>
            <div className="pokedex-body" style={{ height: isSmallScreen ? "70vh" : '68vh', overflowY: 'scroll' }}>
            {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </div>
                ) : (
                <div className="pokedex-pokemon">
                    <ImageList sx={{ width: "100%", height: "100%"}} cols={isSmallScreen ? 2 : isMediumScreen ? 4 : 6}>
                        {pokemons.map((pokemon) => (
                            
                            <ImageListItem sx={{ ...getImageListItemSize(), objectFit: 'cover' }} key={pokemon.id}>
                            <img
                                srcSet={`${pokemon.sprites}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${pokemon.sprites.front_default}?w=164&h=164&fit=crop&auto=format`}
                                alt={pokemon.name}
                                loading="lazy"
                                onClick={() => navigate('/pokedex/' + pokemon.id + '/')}
                            />
                            <ImageListItemBar
                                title={pokemon.name.toUpperCase()}
                                subtitle={pokemons.name}
                                actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${pokemon.name}`}
                                >
                                    <InfoIcon />
                                </IconButton>
                                }
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Pokedex;