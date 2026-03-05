import { Pokemon } from "./Pokemon";

export class PokemonBuilder {
    private name: string = "";
    private image: string = "";
    private types: string[] = [];
    private abilities: string[] = [];
    private moves: string[] = [];

    setName(name: string) {
        this.name = name;
        return this;
    }
    setImage(image: string) {
        this.image = image;
        return this;
    }
    setTypes(types: string[]) {
        this.types = types;
        return this;
    }
    setAbilities(abilities: string[]) {
        this.abilities = abilities;
        return this;
    }
    setMoves(moves: string[]) {
        this.moves = moves;
        return this;
    }
    build() {
        return {
            name: this.name,
            image: this.image,
            types: this.types,
            abilities: this.abilities,
            moves: this.moves
        };
    }
}