import { useState, useEffect } from "react";

const POKEMON: string = "charmander";

interface Pokemon {
  name: string;
  image: string;
  hp: number;
  type: string;
  weakness: {
    double: string[];
    half: string[];
  };
  description: string;
  moves: string[];
}

const usePokemonService = (searchTerm: string = POKEMON) => {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );

      const data = await response.json();

      let weakness = await fetch(data.types[0].type.url)
        .then((response) => response.json())
        .then((data) => {
          return {
            double: data.damage_relations.double_damage_from.map(
              (type: { name: string }) => {
                return type.name;
              }
            ),

            half: data.damage_relations.half_damage_from.map(
              (type: { name: string }) => {
                return type.name;
              }
            ),
          };
        });

      let description = await fetch(data.species.url)
        .then((response) => response.json())
        .then((data) => {
          return data.flavor_text_entries[3].flavor_text
            .replaceAll("\n", " ")
            .replaceAll("\f", " ");
        });

      const pokemon: Pokemon = {
        name: data.name,
        image:
          searchTerm === "charmander"
            ? "https://naramsim.github.io/Colosseum/images/pokemons/4.svg"
            : data.sprites.front_default,
        hp: data.stats[0].base_stat,
        type: data.types
          .map((type: { type: { name: string } }) => type.type.name)
          .join(", "),
        weakness,
        description,
        moves: data.moves.map(
          (move: { move: { name: string } }) => move.move.name
        ),
      };

      setPokemon(pokemon);
      setLoading(false);
    };

    fetchPokemon();
  }, []);

  return { pokemon, loading };
};

export default usePokemonService;
