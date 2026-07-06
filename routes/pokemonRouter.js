const express = require('express')
const router = express.Router()
const { getallPokemon, getPokemonbyId, createPokemon, updatePokemon, deletePokemon } = require('../controllers/pokemoncontroller')
const upload = require('../middleware/multer')

router.get('/',getallPokemon)
router.patch('name', upload.single('image'), updatePokemon)
router.delete('/:name',deletePokemon)
router.get('/:id',getPokemonbyId)
router.post('/',upload.single('image'), createPokemon)

module.exports = router