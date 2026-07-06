const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema(
  {
    pokeId: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    types: {
      type: [String],
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    abilities: {
      type: [String],
      required: true,
    }
  }
);

module.exports = mongoose.model("Pokemon", pokemonSchema);