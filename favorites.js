
//GET OBJECT
function getFavoriteArtwork() {
    axios.get('http://localhost:4004/favorites')
    .then(res => { 
        console.log(res); 
    }).catch(err => {console.log(err)})
}
//MAKE CARDS WITH ALL THE DATA
// const makeCard = artIdString => {
//     await axios.get(`https://api.artic.edu/api/v1/artworks/?ids=${artIdString}`)
//     .then(res => {
//         return res; 
//      }).then(async res => {
//         console.log(res.data)
//         for(let i =0; i<res.data.length; i++){
//             let image_id = artworkIdData.data.data[i].image_id; 
//             let base_endpoint = artworkIdData.data[i].config['iiif_url'];
//             let makeUrl = base_endpoint.concat('/', image_id, '/', append); 
//             let childdiv${[i]} = child.appendChild("div");
//             let medium = arr.data.data[i].medium_display; 
//             let title = arr.data.data[i].title; 
//             let dimensions = arr.data.data[i].dimensions; 
//             let timePeriod = arr.data.data[i].style_title; 
//             let artist = arr.data.data[i].artist_title; 
//             childdiv${[i]}.innerHTML = `Title: ${title} <br> Artist: ${artist}<br> Medium: ${medium} <br>  Dimensions: ${dimensions} <br> Time Period: ${timePeriod} `;
            
//             let childimg${[i]} = childdiv${[i]}.appendChild("img")
//             childimg${[i]}.setAttribute("src", makeUrl);
//         }}).catch(err => {console.log(err)})
//     }
//Allow user to un-favorite the cards, which will delete the record in favorites
// const deleteFavorite = id => {
//     axios.delete('http://localhost:4004/delete/', body)
//         .then(res => {
            
//         }).catch(err => {console.log(err)})

// }
//allow the user to add a commment for why they like the artwork for each favorited card

getFavoriteArtwork(); 