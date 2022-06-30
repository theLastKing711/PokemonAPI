import { Pagination } from './../utils/types';
import { useState } from 'react';

import axios from "axios";
import { url } from 'inspector';
import { Pokemon, PokemonDetails } from '../utils/types';
import { off } from 'process';




export const getPokemons =  async ({limit, offset}: Pagination): 
Promise<[PokemonDetails[], number, number|null, number|null]> => {
    
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    
    const { data } = res;
    
    const result: Pokemon[] = data.results
    const count: number = data.count;
    const next: number | null = data.next;
    const previous: number | null = data.previous;
    
    const subRequests = result.map(item => 
        axios.get(item.url).then(res => {
            // axios.get(res.data.spicies.url)
            return res.data
        })

    )
    
    let pokemons: PokemonDetails[] = []
    
    await Promise.all(subRequests).then(resuls => {
        pokemons = [...resuls]
    })
    
    const colorRequests = pokemons.map(item => 
        axios.get(item.species.url).then(res => {
            return res.data
        })
    )
    
    await Promise.all(colorRequests).then(result => {
       result.map((spicie,index) => {
        pokemons[index] = {...pokemons[index], color: spicie.color.name}
       })
    })

    console.log("pokemons", pokemons)
    
    return [pokemons, count, next ,previous];
   
}

export const getPokemon = async (id: string): Promise<PokemonDetails> => {
    
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    
    const { data } = res;
    
    const pokemonDetails: PokemonDetails = data
    
    const {data: spicie} = await axios.get(pokemonDetails.species.url)

    pokemonDetails.color = spicie.color.name;
    
    return pokemonDetails
    
}
