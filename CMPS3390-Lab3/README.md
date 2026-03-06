What file is acting as your “main screen” right now?
    the file App.tsx is the main screen right now because it contains HomeScreen

What is state here, and what does it control?
    the state is the pokemonName variable, it stores what the user types into the TextInput

What happens when fetch receives a non-200 response?
    when fetch receives a non-200 response, response.ok becomes false and throws an error. it then goes to .catch() to log the error and not crash the app

Why shouldn’t we assume the response JSON always has the fields we want?
    the API might return an error or missing data. assuming a field exists when it doesn't can cause runtime errors. to prevent this, you can validate the JSON and handle errors before using it

Where does “app truth” live right now?
    the app truth is in the HomeScreen, it includes pokemonName, loading, error, and pokemon. these state variables determine what is shown by the UI

What bug happens if you forget to set loading=false on failure?
    if loading = false when the fetch fails, the loading message will stay visible and the app will get stuck

What is the difference between rendering raw JSON vs. rendering a shaped object?
    rendering raw JSON can be large with nested objects that might not be needed. rendering shaped objects only contains the fields that are needed so using shaped objects is simpler and easier to maintain

Which part of the file is UI responsibility vs. logic responsibility?
    the UI responsibility is displaying the input box, button, loading text, error text, pokemon name, image types, abilities, and moves. the logic responsibility is fetching data from the API, managing states, and input validation

List 3 different responsibilities currently inside index.tsx.
    UI rendering (showing input, button, text), state management (keeping track of pokemonName, loading, error, and pokemon), and API logic and data fetching (calling the PokeAPI, parsing the response, and handling errors)

If you wanted to reuse the Pokémon API logic in another screen, what would you do?
    move the fetch and parsing to another file and export it so other screens can import and call the function instead of repeating code

If you wanted to test the API parsing logic, how would you do it right now?
    to test the API parsing logic you'd have to run the app and  check the console output, since the logic is inside the component

Why is it a win that the service doesn’t import React?
    the service only handles data fetching and parsing, making it independent from the UI. this makes it reusable in other parts of the app and is easier to test because you don't need to show the UI elements to check the API logic

What is the contract of the service function (inputs/outputs/errors)?
    the input is a pokemon name as a string, the output is the data about that pokemon returned from the API, and the errors are if the name is empty or the pokemon can't be found

What does a builder pattern buy you here?
    it lets you create Pokemon objects using setters so you don't have to worry about the order for arguments

In what way is a model safer than raw API JSON?
    the model only uses the fields that the app needs and provides type safety that reduces errors from unexpected or missing API data

What responsibilities does the controller own?
    the controller handles input validation(makes sure the pokemon name is valid), manages state for loading, error messages, and the fetched pokemon, and calls getPokemon to fetch data from the API

Why is the controller a better place for input validation than the view?
    the controller is a better place because it makes the view simple and focused on the UI instead of the rules, it makes the logic reusable and testable without needing to see the UI components

What props does the view need?
    the view needs props for all the data that is displayed and actions it triggers including: pokemonName, setPokemonName, pokemon, loading, error, onSearch

What would break if the view tried to call the API directly?
    if the view called the API, it would mix the UI code with data fetching logic. this would make the app harder to maintain, test, and reuse

Why should favorites live in the controller and not the view?
    the controller manages the app's data and logic while the view only displays UI

What does “derived state” mean for isFavorite?
    derived state means it's calculated from the current Pokemon. isFavorite is derived because it's calculated from the current Pokemon and the favorites list.