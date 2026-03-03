import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");

  function handleSearch() {
    const name = pokemonName.trim().toLowerCase();
    if(!name) {
      console.log("Please enter a Pokemon name");
      return;
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        if(!response.ok) {
          throw new Error(`Pokemon not found: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("PokeAPI response:", data);
      })
      .catch(error => {
        console.error("Error fetching Pokemon:", error.message);
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