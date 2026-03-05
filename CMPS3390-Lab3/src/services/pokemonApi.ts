import { Pokemon } from "../models/Pokemon";

export function getPokemon(name: string) {
    const trimName = name.trim().toLowerCase();
    if(!trimName) {
      return Promise.reject(new Error("Please enter a Pokemon name"));
    }
    return fetch(`https://pokeapi.co/api/v2/pokemon/${trimName}`)
      .then(response => {
        if(!response.ok) {
          throw new Error(`Pokemon not found: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        return {
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name),
        abilities: data.abilities.map((a: any) => a.ability.name),
        moves: data.moves.slice(0, 5).map((m: any) => m.move.name)
        } as Pokemon;
      });
}