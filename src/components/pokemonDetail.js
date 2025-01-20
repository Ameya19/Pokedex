import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PokedexAppBar from './pokedexAppBar';
import Footer from './footer.js';
import './pokemonDetail.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet';
import useMediaQuery from '@mui/material/useMediaQuery';

const PokemonDetail = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [pokemonTypes, setPokemonTypes] = useState(null);
    const [loading, setLoading] = useState(true);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:960px)');

    const backgroundColor = {
        'normal': '#A8A77A',
        'fire': '#EE8130',
        'water': '#6390F0',
        'electric': '#F7D02C',
        'grass': '#7AC74C',
        'ice': '#96D9D6',
        'fighting': '#C22E28',
        'poison': '#A33EA1',
        'ground': '#E2BF65',
        'flying': '#A98FF3',
        'psychic': '#F95587',
        'bug': '#A6B91A',
        'rock': '#B6A136',
        'ghost': '#735797',
        'dragon': '#6F35FC',
        'dark': '#705746',
        'steel': '#B7B7CE',
        'fairy': '#D685AD'
    };

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const results = response.data;

                const pokemonData = await Promise.all(
                    results.types.map(async (post) => {
                        return post.type.name;
                    })
                );
                setPokemon(response.data);
                setPokemonTypes(pokemonData);
                console.log(pokemonData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Pokémon details:", error.message);
            }
        };

        fetchPokemon();
    }, [id]);

    function playSound() {
        const cry = new Audio(pokemon.cries.latest);
        cry.play();
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <div id="pokemon-detail">
            <PokedexAppBar />
            {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <CircularProgress />
                            </div>
                        ) : (
            <div>
                <Helmet>
                    <title>{capitalizeFirstLetter(pokemon.name)}</title>
                </Helmet>
                <h1 className='pokemon-name'>{pokemon.name.toUpperCase()} <VolumeUpIcon fontSize='medium' onClick={playSound}/></h1>
                <div className="pokemon-detail-info" style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: 'space-around',height: isSmallScreen ? "66vh":"60vh", 
                    overflowY: isSmallScreen ? 'scroll' : 'hidden' }}>
                
                <div className="pokemon-sprites">
                    <img className='pokemon-gif' src={pokemon.sprites.other.showdown.front_default || pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                    <div className="pokemon-attributes">
                        <TableContainer component={Paper} sx={{ width: isSmallScreen ? '100%' : 'auto' }}>
                            <Table className='pokemon-stats' sx={{ minWidth: isSmallScreen ? 150 : 300 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow className="cell"  >
                                        <TableCell>Attribute</TableCell>
                                        <TableCell align="right">Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">ID</TableCell>
                                        <TableCell align="right">{pokemon.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Name</TableCell>
                                        <TableCell align="right">{capitalizeFirstLetter(pokemon.name)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Height</TableCell>
                                        <TableCell align="right">{pokemon.height/10} m</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Weight</TableCell>
                                        <TableCell align="right">{pokemon.weight/10} kg</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Base Experience</TableCell>
                                        <TableCell align="right">{pokemon.base_experience}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Types</TableCell>
                                        <TableCell align="right">
                                            {pokemonTypes.map((type) => (
                                                <Box
                                                key={type}
                                                sx={{
                                                    display: 'inline-block',
                                                    padding: '5px 10px',
                                                    margin: '2px',
                                                    backgroundColor: backgroundColor[type],
                                                    borderRadius: '5px',
                                                    color: 'white',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {capitalizeFirstLetter(type)}
                                            </Box>
                                        ))} 
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Abilities</TableCell>
                                        <TableCell align="right">
                                            {pokemon.abilities.map(abilityInfo => capitalizeFirstLetter(abilityInfo.ability.name)).join(', ')}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            )}
            <Footer />
        </div>
    );
};

export default PokemonDetail;