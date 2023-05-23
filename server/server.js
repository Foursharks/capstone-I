require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {getArtists} = require('./controller.js')
const {getArtwork} = require('./controller.js')
const {addFavorite} = require('./controller.js')
const {getFavorites} = require('./controller.js')
const {deleteFavorite} = require('./controller.js')

app.use(express.json())
// app.use(express.static())
app.use(cors())
//Display artists and artworks
app.get('/artists', getArtists)
app.get('/artwork', getArtwork)
//add a favorite to the favorites database
app.post('/favorites', addFavorite)
//get all favorites from the favorites database
app.get('/favorites', getFavorites)
app.get('/delete', deleteFavorite)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))