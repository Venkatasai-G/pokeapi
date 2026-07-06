const mongoose = require("mongoose");
const axios = require("axios");
const Pokemon = require("../models/Pokemon");

async function seed() {
  try {

    const pokemons = [];

    for (let i = 1; i <= 1; i++) {
      const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`);

      pokemons.push({
        pokeId: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        types: data.types.map((t) => t.type.name),
        height: data.height,
        abilities: data.abilities.map((a) => a.ability.name),
      });
    }

    await Pokemon.insertMany(pokemons);

    console.log("100 Pokémon inserted successfully!");
    
  } catch (err) {
    console.error(err);
  } 

}

module.exports = seed