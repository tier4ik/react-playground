import { useEffect } from "react";

import { PokemonType, DataType } from "../index";

export function useGetPokemons(
    offset: number,
    setPokemons: React.Dispatch<React.SetStateAction<PokemonType[]>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
) {
    useEffect(() => {
        async function getPokemons() {
            const chunk = 12;
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${chunk}&offset=${offset * chunk}`);
                if (response.ok) {
                    const data: DataType = await response.json();
                    const pokemonData = data.results.map(p => ({...p, url: `https://img.pokemondb.net/artwork/${p.name}.jpg`}));
                    setPokemons(prevPokemos => [...prevPokemos, ...pokemonData]);
                } else {
                    throw Error()
                }
            } catch (error) {
                setError("Cannot fetch pokemon list");
            }
        };
        getPokemons();
    },[offset]);
}