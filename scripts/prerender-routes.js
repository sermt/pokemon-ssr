(async ()=>{
  const totalPokemons = 21;
  const totalPages = Math.ceil(totalPokemons / 20);
  const fs = require('fs');
  const pokemonsIds = Array.from({length: totalPokemons}, (_, i) => i + 1);
  let fileContent = pokemonsIds.map(id => `/pokemons/${id}`).join('\n');
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);
  fileContent += '\n' + pages.map(page => `/pokemons/page/${page}`).join('\n');

  fs.writeFileSync('routes.txt', fileContent);

console.log(fileContent)
})();
