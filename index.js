const express = require('express')
const connectdb = require('./config/db')
const dotenv = require('dotenv')
const app = express()
const pokemonroute = require('./routes/pokemonRouter')
const authroute = require('./routes/authRouter')

dotenv.config()
connectdb()

app.use(express.json())

app.use('/pokemon',pokemonroute)
app.use('/pokemon', authroute)

app.get('/',(req,res)=>{
    res.send('service is running')
})

app.listen(5001,()=>{
    console.log('server is started')
})