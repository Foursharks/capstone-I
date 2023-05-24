
//GET OBJECT
function getFavoriteArtwork() {
    axios.get('http://localhost:4004/favorites')
    .then(res => { 
        const div = document.getElementById("cardcontainer");
        
        const array = res.data; 
        for (let i = 0; i<array.length; i++){
                //CREATE A CARD FOR EACH OBJECT IN ARRAY
                const artDetailCard = document.createElement("div");
                artDetailCard.id="artDetailCard"; 
                //DECONSTRUCT ALL KEYS FROM ARRAY
                const {title, artist,dimensions, medium, time_period, url} = array[i]; 
                //BUILD IMAGE PART OF CARD
                const imgDiv = document.createElement("div")
                imgDiv.id="imageContainer"; 
                artDetailCard.appendChild(imgDiv)
                const urlEl = document.createElement("img");
                imgDiv.appendChild(urlEl)
                urlEl.setAttribute("src", url);
                imgDiv.appendChild(urlEl);
                //BUILD TEXT PART OF CARD
                const titleEl = document.createElement("h2");
                titleEl.textContent = title;
                const artistEl = document.createElement("p");
                artistEl.textContent = `Artist: ${artist}`;
                const dimensionsEl = document.createElement("p");
                dimensionsEl.textContent = `Dimensions: ${dimensions}`;
                const mediumEl = document.createElement("p");
                mediumEl.textContent = `Medium: ${medium}`;
                const timePeriodEl = document.createElement("p");
                timePeriodEl.textContent = `Time Period: ${time_period}`;
                
                artDetailCard.appendChild(titleEl);
                artDetailCard.appendChild(artistEl);
                artDetailCard.appendChild(dimensionsEl);
                artDetailCard.appendChild(mediumEl);
                artDetailCard.appendChild(timePeriodEl);
                ;
                //APPEND CARD TO THE PARENT CONTAINER
                div.appendChild(artDetailCard);
        }              
    
} ).catch(err => {console.log(err)})
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