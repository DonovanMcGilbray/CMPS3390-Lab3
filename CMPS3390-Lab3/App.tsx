import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import { getPokemon } from "./src/services/pokemonApi";
import { Pokemon } from "./src/models/Pokemon";

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null> (null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  function handleSearch() {
    setLoading(true);
    setError(null);
    setPokemon(null);
    getPokemon(pokemonName)
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemonName}
        onChangeText={setPokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={handleSearch} />

      {loading && <Text>Loading...</Text>}
      {error && <Text style = {{ color: "red"}}>{error}</Text>}
      {pokemon && (
        <View>
          <Text>Name: {pokemon.name}</Text>
          {pokemon.image && (
            <Image
              source = {{uri: pokemon.image }}
              style = {{ width: 120, height: 120 }}
            />
          )}
          <Text>Types:</Text>
          {pokemon.types.map((t, i) => (
            <Text key = {i}>- {t}</Text>
          ))}
          <Text>Abilities:</Text>
          {pokemon.abilities.map((a, i) => (
            <Text key = {i}>- {a}</Text>
          ))}
          <Text>First 5 Moves:</Text>
          {pokemon.moves.map((m, i) => (
            <Text key = {i}>- {m}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
});