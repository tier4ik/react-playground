import { useEffect } from "react";

import { PokemonType } from "../index";

export function useObservItem(
    pokemons: PokemonType[],
    getNextChunk: () => void,
    itemToObserve: React.RefObject<HTMLLIElement>) {
    useEffect(() => {
        const observedItem = itemToObserve.current;
        if (observedItem) {
            const observer = new IntersectionObserver((enries, observer) => {
                enries.forEach(entry => {
                    if (entry.isIntersecting) {
                        observer.unobserve(observedItem);
                        getNextChunk();
                    }
                })
            }, {
                threshold: 1.0
            });
            observer.observe(observedItem);
        }
    }, [pokemons])
}