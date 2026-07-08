const express = require('express')
const router = express.Router()
const { getallPokemon, getPokemonbyId, createPokemon, updatePokemon, deletePokemon } = require('../controllers/pokemoncontroller')
const upload = require('../middleware/multer')
const auth = require('../middleware/authcheck')
const usersauth = require('../middleware/userauth')
const userauth = require('../middleware/userauth')

router.get('/search', getallPokemon)
router.patch('/upload/:name', auth, userauth, upload.single('image'), updatePokemon)
router.delete('/delete/:name', auth, userauth, deletePokemon)
router.get('/:id', getPokemonbyId)
router.post('/create', auth, userauth, upload.single('image'), createPokemon)

module.exports = router