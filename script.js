const list = document.getElementById("list");
const btPrevious = document.getElementById("btPrevious");
const btNext = document.getElementById("btNext");

var dados = {};
var pokemonDados = {};

const getData = (url) => {
    console.log("fetch");
    fetch(url)
        .then(res => res.json())
        .then(data => {
            dados = data;

            console.log(dados);

            var pokemons = dados.results;

            btPrevious.disabled = !dados.previous;
            btNext.disabled = !dados.next;

            list.innerHTML = "";
            for(i = 0; i < pokemons.length; i++){
                cardPokemon(pokemons[i].url);
            }
        })
}

const cardPokemon = (url) => {
    const pokemonItem = document.createElement("li");
    const pokemonCard = document.createElement("a");

    getPokemonData(url, pokemonCard);
    
    pokemonItem.appendChild(pokemonCard);
    
    list.appendChild(pokemonItem);
}

const getPokemonData = (url, li) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            pokemonDados = data;
            console.log(pokemonDados);

            //img
            const img = document.createElement("img");
            img.src = pokemonDados.sprites.front_default;
            li.appendChild(img);

            //name
            const pokemonName = document.createTextNode(pokemonDados.name);
            const pokemonTitle = document.createElement("h3");
            pokemonTitle.appendChild(pokemonName);
            li.appendChild(pokemonTitle);

            //types
            for(i = 0; i < pokemonDados.types.length; i++){
                var type = "";
                if(i => 1){
                    type = document.createTextNode(" "+ pokemonDados.types[i].type.name);
                }
                else{
                    type = document.createTextNode(pokemonDados.types[i].type.name);
                }

                const pokemonType = document.createElement("span");
                pokemonType.appendChild(type);
                
                li.appendChild(pokemonType);
            }
        })
}

const handleBtPreviousClick = () => {
    getData(dados.previous);
}

const handleBtNextClick = () => {
    getData(dados.next);
}

getData("https://pokeapi.co/api/v2/pokemon");

btPrevious.onclick = handleBtPreviousClick;
btNext.onclick = handleBtNextClick;