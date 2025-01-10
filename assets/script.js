function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
      <div class="detail">
        <ol class="types">
          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokemon.photo}" 
             alt="${pokemon.name}">
      </div>
    </li>
  `;
}

const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton'); // Botão "Load More"
const maxRecords = 151
let offset = 0;
const limit = 10;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join('');
      pokemonList.innerHTML += newHtml;
  });
}

// Carrega os primeiros Pokémons na página
document.addEventListener('DOMContentLoaded', () => {
  loadPokemonItens(offset, limit);
});

// Evento para carregar mais Pokémons ao clicar no botão
loadMoreButton.addEventListener('click', () => {
  offset += limit;

  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }
  else {
  loadPokemonItens(offset, limit);
}
});