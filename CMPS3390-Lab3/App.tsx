import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null> (null);
  const [pokemon, setPokemon] = useState<any>(null);

  function handleSearch() {
    const name = pokemonName.trim().toLowerCase();
    if(!name) {
      setError("Please enter a Pokemon name");
      return;
    }
    setLoading(true);
    setError(null);
    setPokemon(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        if(!response.ok) {
          throw new Error(`Pokemon not found: ${response.status}`);
        }
        return response.json();
      })
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
          {pokemon.sprites?.front_default && (
            <Image
              source = {{ uri: pokemon.sprites.front_default }}
              style = {{ width: 120, height: 120 }}
              />
          )}
          <Text>Types:</Text>
          {pokemon.types?.map((t: any, i: number) => (
            <Text key = {i}>- {t.type.name}</Text>
          ))}
          <Text>Abilities:</Text>
          {pokemon.abilities?.map((a: any, i: number) => (
            <Text key = {i}>- {a.ability.name}</Text>
          ))}
          <Text>First 5 Moves:</Text>
          {pokemon.moves?.slice(0, 5).map((m: any, i: number) => (
            <Text key = {i}>- {m.move.name}</Text>
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