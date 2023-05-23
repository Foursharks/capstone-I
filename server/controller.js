require('dotenv').config(); 
const axios = require('axios'); 

const {CONNECTION_STRING} = process.env;

const Sequelize = require('sequelize'); 

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    getArtists: (req, res) => {
        sequelize.query(`
              SELECT
                  artist_title
              FROM "someArtworks"
              order by random() 
              LIMIT 4; 
          `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => {res.status(500).send(err)});
    },

    getArtwork: (req, res) => {
        sequelize.query(`
              SELECT
                id
              FROM "someArtworks"
              order by random() 
              LIMIT 1; 
          `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => {res.status(500).send(err)});
    }, 
    addFavorite: (req, res) => {
        const {name, artwork_id} = req.body;
        sequelize.query(`
        INSERT INTO "favorites"(name, artwork_id)
        VALUES ('${name}', ${artwork_id})
    `)
  .then(dbRes => res.status(200).send(dbRes[0]))
  .catch(err => {res.status(500).send(err)});
    }, 

    getFavorites: (req, res) => {
        sequelize.query(`
        SELECT  ARRAY_AGG (DISTINCT artwork_id)
        FROM
            favorites
    `)
        .then(async (dbRes) => {
            let artIdString = dbRes[0][0].array_agg.map(String).join(',');
            await axios.get(`https://api.artic.edu/api/v1/artworks/?ids=${artIdString}`)
                .then(res => {
                    let cardArr =[]; 
                    let base_endpoint = res.data.config['iiif_url'];
                    let append='full/843,/0/default.jpg';
                    for(let i = 0; i<res.data.data.length; i++){
                        let image_id = res.data.data[i].image_id; 
                        let url = base_endpoint.concat('/', image_id, '/', append); 
                        let medium = res.data.data[i].medium_display; 
                        let title = res.data.data[i].title; 
                        let dimensions = res.data.data[i].dimensions; 
                        let timePeriod = res.data.data[i].style_title; 
                        let artist = res.data.data[i].artist_title;
                        let newObj = {
                            url: url, 
                            title: title, 
                            artist: artist,
                            medium: medium, 
                            dimensions: dimensions, 
                            time_period: timePeriod
                        }; 
                    }
                    cardArr.push(newObj); 
                   
                })
                res.status(200).send(cardArr); 
            }).catch(err => res.status(500).send(err));
    }, 

    deleteFavorite:(req, res) => {
        const {artwork_id} = req.body; 
        sequelize.query(`
        DELETE
        FROM "favorites"
        WHERE artwork_id = ${artwork_id}; 
    `)
    .then(console.log("deleted"))
    .catch(err => {res.status(500).send(err)});
    }

}
