// Definição da classe Pokemon
class Pokemon {
  constructor() {
      this.number = '';
      this.name = '';
      this.types = [];
      this.type = '';
      this.photo = '';
  }
}

const pokeApi = {};

// Função para converter detalhes da API em um objeto Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type; // Classe CSS será baseada no tipo principal

  pokemon.photo = pokeDetail.sprites.other['dream_world'].front_default || 'fallback-image.png';
  return pokemon;
}

// Função para obter detalhes de um Pokémon
pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
      .then((response) => response.json())
      .then(convertPokeApiDetailToPokemon);
};

// Função para obter uma lista de Pokémons
pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
      .then((response) => response.json())
      .then((jsonBody) => jsonBody.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      .then((detailRequests) => Promise.all(detailRequests))
      .then((pokemonsDetails) => pokemonsDetails);
};