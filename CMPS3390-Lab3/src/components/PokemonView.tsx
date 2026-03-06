import { Button, Text, TextInput, View, Image, StyleSheet } from "react-native";
import { Pokemon } from "../models/Pokemon";

type Props = {
    pokemonName: string;
    setPokemonName: (name: string) => void;
    pokemon: Pokemon | null;
    loading: boolean;
    error: string | null;
    onSearch: () => void;
    favorites: string[];
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onLoadFavorite: (name: string) => void;
};

export default function PokemonView({ pokemonName, setPokemonName, pokemon, loading, error, onSearch, favorites, isFavorite, onToggleFavorite, onLoadFavorite }: Props) {
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Pokemon Search</Text>
            <TextInput
                style = {styles.input}
                placeholder = "Enter Pokemon name (e.g., pikachu)"
                value = {pokemonName}
                onChangeText = {setPokemonName}
                autoCapitalize = "none"
                autoCorrect = {false}
            />
            <Button title = "Get Pokemon" onPress = {onSearch} />
            {loading && <Text>Loading...</Text>}
        {error && <Text style = {{ color: "red"}}>{error}</Text>}
        {pokemon && (
            <View>
            <Text>Name: {pokemon.name}</Text>
            <Button title = {isFavorite ? "Unfavorite" : "Favorite"} onPress = {onToggleFavorite}/>
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
            <Text style = {{ marginTop: 20 }}>Favorites</Text>
            {favorites.map((name, i) => (
                <Text key = {i} style = {{ color: "blue" }} onPress = {() => onLoadFavorite(name)}
                >
                    {name}
                </Text>
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