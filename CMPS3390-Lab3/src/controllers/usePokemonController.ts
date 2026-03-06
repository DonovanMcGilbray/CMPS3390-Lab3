import { useState } from "react";
import { Pokemon } from "../models/Pokemon";
import { getPokemon } from "../services/pokemonApi";

export function usePokemonController() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null> (null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const isFavorite = pokemon !== null && favorites.includes(pokemon.name);

  function handleSearch(name: string) {
    const trimName = name.trim().toLowerCase();
    if(!trimName) {
        setError("Please enter a Pokemon name");
        return;
    }
    setLoading(true);
    setError(null);
    setPokemon(null);
    getPokemon(trimName)
      .then(data => {
        setPokemon(data);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function toggleFavorite() {
    if(!pokemon) return;
    if(favorites.includes(pokemon.name)) {
        setFavorites(favorites.filter(f => f !== pokemon.name));
    } else {
        setFavorites([...favorites, pokemon.name]);
    }
  }

  function loadFavorite(name: string) {
    handleSearch(name);
  }

  return {
    pokemon,
    loading,
    error,
    handleSearch,
    favorites,
    isFavorite,
    toggleFavorite,
    loadFavorite
  };
}