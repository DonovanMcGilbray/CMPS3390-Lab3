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
      });
}