import { useState } from "react";
import { Pokemon } from "../models/Pokemon";
import { getPokemon } from "../services/pokemonApi";

export function usePokemonController() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null> (null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

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
  return {
    pokemon,
    loading,
    error,
    handleSearch
  };
}