import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import { usePokemonController } from "./src/controllers/usePokemonController";
import PokemonView from "./src/components/PokemonView";

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");
  const { pokemon, loading, error, handleSearch, favorites, isFavorite, toggleFavorite, loadFavorite } = usePokemonController();

  return (
    <PokemonView
      pokemonName = {pokemonName}
      setPokemonName = {setPokemonName}
      pokemon = {pokemon}
      loading = {loading}
      error = {error}
      onSearch = {() => handleSearch(pokemonName)}
      favorites = {favorites}
      isFavorite = {isFavorite}
      onToggleFavorite = {toggleFavorite}
      onLoadFavorite = {loadFavorite}
    />
  );
}