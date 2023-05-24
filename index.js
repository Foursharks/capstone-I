// const button1 = document.getElementById("Artist1");
const buttonsSec = document.querySelector('#buttons-sec');
// const countCorrect = 0; 
// const attempts = 0; 
const artDetail = document.createElement("div");
const parentElementArtDetail = document.getElementById("parent-Element-For-Art-Detail-Sec"); 
const statusInfo = document.getElementById("title-sec");
const playAgainBtn = document.getElementById("Play-again");
const form = document.querySelector('form')
const emailInput = document.querySelector('#email')
const signUpBtn = document.getElementById("Sign-up")
const favoriteBtn = document.getElementById("Favorite-Btn")
const nameInput = document.getElementById("Name")
const h2 = document.getElementById("selection")
let artworkId; 
let allButtons;

//HAMBURGER MENU
const hamburgerBtn = document.querySelector(".hamburger")
const menu =document.querySelector(".menu")
hamburgerBtn.addEventListener('click', function() {
    menu.classList.toggle("hide")
  })
  
//FAVORITE AN ARTWORK
    favoriteBtn.addEventListener('click', e =>{
        e.preventDefault()
        const name = nameInput.value; 
        const body = {
            name: name, 
            artwork_id: artworkId
        }
        if(name!=""){
            axios.post('http://localhost:4004/favorites/', body)
            .then(response => {
              favoriteBtn.style.backgroundColor = '#aaaaaa';
            })
            .catch(err => {
              console.log(err)
            })  
        }
        else {
       alert("Please enter your name");
        }
})



//CAPTURE AND POST USER EMAIL TO DB 
// const addEmail = event => {
//     event.preventDefault()
//     const email = emailInput.value
//     const body = {
//         email: email
//     }
//     if(email != ""){
//         axios.post('http://localhost:4004/users/', body)
//         .then(response => {
//           console.log('sent')
//         })
//         .catch(err => {
//           console.log(err)
//         })  
//     }
//     else {
//         alert("Please enter a valid email address");
//     }
// }

// form.addEventListener('submit', addEmail)


 //Step 1: Get an id from my database, because I know all those ids have photos attached to them (querying api directly does not always return an artwork with a photo)
const getArtwork = async () => axios.get('http://localhost:4004/artwork')
.then(res => {
   return res; 
}).then(async res => {
    artworkId = res.data[0].id;
    //Step 2: Query the art institute database so that I can get the rest of the data
    let artworkIdData = await axios.get(`https://api.artic.edu/api/v1/artworks/${artworkId}`)
    const arr = shuffle(); 
    //Send the artwork detail information and a shuffled button array to the insertions function
    insertions(artworkIdData, arr)

})
.catch(err => {console.log(err)})

//MAKE PARTS OF THE URL TO QUERY IMAGE, INSERT ARTIST NAMES INTO BUTTON TEXT, AND PASS ARTIST INFORMATION AND DATA TO THE WIN FUNCTION
const insertions = (artworkIdData, arr) => {
    //Need for the image to render
    let image_id = artworkIdData.data.data.image_id; 
    let base_endpoint = artworkIdData.data.config['iiif_url'];
    //Need to display the artist on a button
    let artist_title =artworkIdData.data.data.artist_title;
    //call the functions that will insert the data into the dom
    imageQuery(image_id, base_endpoint); 
    insertArtistName(artist_title, arr); 
    win(artist_title, artworkIdData);
}
//MAKE URL AND DISPLAY IT ON PAGE
const imageQuery = (image_id, base_endpoint) => {
    
    let append='full/843,/0/default.jpg';
    let makeUrl = base_endpoint.concat('/', image_id, '/', append); 
    let image = document.getElementById("placeholder"); 
    image.removeAttribute("src");
    image.setAttribute("src", makeUrl);
}
//SHUFFLES BUTTON ID NUMBERS RANDOMLY AND RETURNS AN ARRAY
const shuffle = () => {
    var buttonNumArr = [1, 2, 3, 4]
    let currentIndex = buttonNumArr.length,  randomIndex;
    //fisher-yates shuffle
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [buttonNumArr[currentIndex], buttonNumArr[randomIndex]] = [
        buttonNumArr[randomIndex], buttonNumArr[currentIndex]];
    }
    return(buttonNumArr)
  }
//TAKES THE "CORRECT" ARTIST NAME AND INSERTS IT INTO A RANDOM BUTTON TEXT
const insertArtistName = (artist_title, arr) => {
    const correctButton = document.getElementById(`Artist${arr[0]}`);
    correctButton.innerHTML = artist_title;
}


//QUERIES MY DB FOR 3 RANDOM ARTIST NAMES AND INSERTS THEM INTO THE OTHER BUTTON TEXT
const getArtists= () => {
//   e.preventDefault()
    axios.get('http://localhost:4004/artists')
        .then(res => {

           allButtons = document.querySelectorAll("#buttons-sec button")
           console.log(allButtons)
            for(let i=0; i<=allButtons.length; i++){
            if(allButtons[i].innerHTML === allButtons[i].getAttribute("id")){
                allButtons[i].innerHTML = res.data[i].artist_title;
                console.log(res.data[i].artist_title) 
            }
           }
        }).catch(err => {console.log(err)})
}
//LISTEN FOR A CLICK EVENT IN THE BUTTONS SECTION, AND IF THE CLICKED BUTTON HAS THE SAME TEXT CONTENT AS ARTIST_TITLE, MAKE THE ART DETAIL
const win = (artist_title, arr) => {
    console.log(`called win which waits for the user to win and adds the try again and gray to the buttons if incorrect selection made`)
    buttonsSec.addEventListener('click', (event) => {
        const clickedButton = event.target;
        if (clickedButton.textContent === artist_title) {
            makeArtDetailPage(arr)
            // countCorrect=countCorrect+1;
            // attempts=attempts+1; 
            console.log(`win triggered`)
        }
        else { 
            clickedButton.textContent = "Try Again"; 
            clickedButton.id = "Clicked"
            console.log(`clicked id and the "try againtext content was added`)
            // attempts=attempts+1; 
        }
        
    })
}
const makeArtDetailPage = (arr) =>
{
    console.log(`called makeartdetail`)
    
    buttonsSec.classList.add("hide");
    selection.classList.add("hide");
    allButtons.forEach(e =>{e.classList.add("hide")});
    
    artDetail.classList.remove("hide");
    artDetail.id = "Art-Detail";
    let medium = arr.data.data.medium_display; 
    let title = arr.data.data.title; 
    let dimensions = arr.data.data.dimensions; 
    let timePeriod = arr.data.data.style_title; 
    let artist = arr.data.data.artist_title; 
    artDetail.innerHTML = `Title: ${title} <br> Artist: ${artist}<br> Medium: ${medium} <br>  Dimensions: ${dimensions} <br> Time Period: ${timePeriod} `;

    parentElementArtDetail.appendChild(artDetail);
    const status = document.createElement("h2"); 
    //create what's inside the div, which is a score
    // status.id = "Status";
    // status.innerHTML = `Artists Correctly Guessed:  ${countCorrect} <br> Attempts:  ${attempts} `;
    //then tell the dom to add the div to a specific parent
    // statusInfo.appendChild(status);
    //unhide the "play again" button
    playAgainBtn.classList.remove("hide");
    playAgainBtn.addEventListener("click",()=>{
        window.location.reload();
    }); 
}
 getArtwork() 
 getArtists()
