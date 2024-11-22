type PokemonType = {
    name: string,
    url: string
}
function PokemonItem({pokemon, intersectionRef}: {pokemon: PokemonType, intersectionRef?: React.RefObject<HTMLLIElement>}) {
    return (
        <li className="pokemon__item" ref={intersectionRef}>
            <img src={pokemon.url} alt={pokemon.name} className="pokemon__image" />
            <p className="pokemon__name">{pokemon.name}</p>
        </li>
    )
}

export default PokemonItem;