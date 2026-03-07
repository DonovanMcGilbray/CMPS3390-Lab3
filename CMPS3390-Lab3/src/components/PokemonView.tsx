import { Button, Text, TextInput, View, Image, StyleSheet, Animated } from "react-native";
import { Pokemon } from "../models/Pokemon";
import { useRef, useEffect } from "react";

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
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "720deg"]
    });
    useEffect(() => {
        if(pokemon) {
            fadeAnim.setValue(0);
            rotateAnim.setValue(0);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true
                })
            ]).start();
        }
    }, [pokemon]);
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
            <Animated.View 
            style = {{ opacity: fadeAnim, transform: [{ rotate }]
                }}
            >
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
        </Animated.View>
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