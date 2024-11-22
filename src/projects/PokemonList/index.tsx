import { useState, useRef } from "react";
import PokemonItem from "./PokemonItem";
// custom hooks
import { useGetPokemons } from "./hooks/useGetPokemons";
import { useObservItem } from "./hooks/useObserveItem";
import "./style.css";
export type PokemonType = {
    name: string,
    url: string
}
export type DataType = {
    count: number,
    next: string,
    previous: string,
    results: PokemonType[]
}
function Pokemon() {
    const itemToObserve = useRef<HTMLLIElement>(null);
    const [offset, setOffset] = useState<number>(0);
    const [pokemons, setPokemons] = useState<PokemonType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    useGetPokemons(offset, setPokemons, setError);

    useObservItem(pokemons, getNextChunk, itemToObserve);
    
    function getNextChunk() {
        setIsLoading(true);
        setTimeout(() => {
            setOffset(prevOffset => prevOffset + 1);
            setIsLoading(false);
        }, 3000)
    }

    return (
        <div className="pokemon">
            {
                error ? <h2>{error}</h2> :
                <ul className="pokemon__container">
                    {
                        pokemons.map((pokemon, ind) => {
                            return ind === pokemons.length - 1 ?
                                <PokemonItem key={pokemon.name} pokemon={pokemon} intersectionRef={itemToObserve} /> :
                                <PokemonItem key={pokemon.name} pokemon={pokemon} />
                        }  )
                    }
                </ul>
            }
            {
                isLoading && <div className="pokemon__loading">Loading next chunk 3 seconds</div>
            }
        </div>
    )
}

export default Pokemon;