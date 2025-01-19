import React, { useState, useEffect } from "react";
import './pokedex.css';
import PokedexAppBar from "./pokedexAppBar";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

function Pokedex() {

    const [posts, setPosts] = useState([]);
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5');
            const data = await response.json();
            await Promise.all( data.results?.map(async (post) => {
                const pokemonData = await axios.get(post.url);
                const pokemon = pokemonData.json();
                console.log(pokemon);
                setPokemons(oldData => [...oldData, pokemon]);
            }));
            
            //console.log(data);
            //setPosts(data.results);
        }

        async function fetchPokemonData(posts) {
            console.log(posts);
            
        }
        console.log(fetchData());
        console.log(fetchPokemonData(posts));

    }, []);
    return (
        <div className="pokedex">
            <div className="pokedex-header">
                <PokedexAppBar />
                <div className="pokedex-body">
                    <div className="pokedex-pokemon">
                        <ImageList sx={{ width: "100vw", height: "100vh" }}>
                            <ImageListItem key="Subheader" cols={6}>
                                <ListSubheader component="div">Kanto Region</ListSubheader>
                            </ImageListItem>
                            {/* {posts.results?.map((item) => console.log(item) || (
                                fetch(item.url)
                                    .then((response) => response.json())
                                    .then((pokemon) => {
                                        <ImageListItem key={pokemon.id}>
                                        <img
                                            src={pokemon.sprites?.front_default}
                                            alt={pokemon.name}
                                        />
                                        <ImageListItemBar
                                            title={""}
                                            subtitle={""}
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
                                    })))} */}
                        </ImageList>
                    </div>
                    {/* <div className="pokedex-list">
                        <ul>
                            {posts.results?.map((post, index) => (
                                <li key={index}>
                                    {post.name}
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Pokedex;