const express = require('express')
const router = express.Router()
const { getallPokemon, getPokemonbyId, createPokemon, updatePokemon, deletePokemon } = require('../controllers/pokemoncontroller')
const upload = require('../middleware/multer')
const auth = require('../middleware/authcheck')

router.get('/', getallPokemon)
router.patch('/:name', auth, upload.single('image'), updatePokemon)
router.delete('/:name', auth, deletePokemon)
router.get('/:id', getPokemonbyId)
router.post('/', auth, upload.single('image'), createPokemon)

module.exports = router