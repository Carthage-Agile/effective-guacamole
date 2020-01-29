var objList;

function boot2(){
addAlbums();
 addPlaylists();
 addArtists();
 generateLibrary();
}

function boot(){
  fetchAllSongs();
}

function openSearch() {
 if (document.getElementById("mainSearch").style.display = "none"){
  document.getElementById("mainSearch").style.display = "block";
  document.getElementById("mainPlaylists").style.display = "none";
  document.getElementById("mainArtists").style.display = "none";
  document.getElementById("mainAlbums").style.display = "none";
 }
}

function go2Playlists(){
  if (document.getElementById("mainPlaylists").style.display = "none"){
  document.getElementById("mainPlaylists").style.display = "block";
  document.getElementById("mainArtists").style.display = "none";
  document.getElementById("mainAlbums").style.display = "none";
  document.getElementById("mainSearch").style.display = "none";
  }
}
function go2Albums(){
  if (document.getElementById("mainAlbums").style.display = "none"){
  document.getElementById("mainAlbums").style.display = "block";
  document.getElementById("mainPlaylists").style.display = "none"
  document.getElementById("mainArtists").style.display = "none"
  document.getElementById("mainSearch").style.display = "none"
  }
}
function go2Artists(){
  if (document.getElementById("mainArtists").style.display = "none"){
  document.getElementById("mainArtists").style.display = "block";
  document.getElementById("mainPlaylists").style.display = "none";
  document.getElementById("mainAlbums").style.display = "none";
  document.getElementById("mainSearch").style.display = "none";
  }
}

function current() {
  
  if (document.getElementById("currentCue").style.display = "none"){
   document.getElementById("currentCue").style.display = "block";
  }
 }

 function closeCurrent() {
  
  if (document.getElementById("currentCue").style.display = "block"){
   document.getElementById("currentCue").style.display = "none";
  }
 }

function shuffle() {
  var x = document.getElementById("shuffle");
  if (x.style.color === "white") {
    x.style.color = "#f7931E";
     /* shuffle on*/
  } else {
    x.style.color = "white";
     /* shuffle off*/
  }
}

 function repeat() {
  var x = document.getElementById("rewind");
  if (x.style.color === "white") {
    x.style.color = "#f7931E";
    /* repeat playlist on*/
  } else {
    x.style.color = "white";
     /* repeat off*/
  }
}

 function repeatSong() {
  var x = document.getElementById("rewind");
  var y = document.getElementById("rewindSong");
  if (x.style.display === "inline") {
    x.style.display = "none";
    y.style.display = "inline";
    /* repeat song on*/
  } else {
    x.style.color = "white";
    x.style.display = "inline";
    y.style.display = "none";
     /* repeat off*/
  }
 
}

function fetchAllSongs() {
  fetch('http://localhost:5000/api/obj_list', {method: 'GET', mode: 'cors'})
  .then(function(response) {
    return response.json();
    }).then(function (obj) {
    console.log('POST response: ');
    console.log(obj);
    objList = obj;
    console.log(objList);
    boot2();
  });
}

function generateLibrary() {
  var library = [];
  library = objList.songs;
  var songList = document.getElementById("libraryBody");
  for (var i = 0; i < library.length; i++) {
    console.log('Array Test: ' + library[i].title)
    var song = document.createElement("tr");

      var cell = document.createElement("td");
      var songName = document.createTextNode(library[i].title);
      cell.appendChild(songName);
      song.appendChild(cell);

      cell = document.createElement("td");
      var artistName = document.createTextNode(library[i].artist);
      cell.appendChild(artistName);
      song.appendChild(cell);


      cell = document.createElement("td");
      var albumName = document.createTextNode(library[i].album);
      cell.appendChild(albumName);
      song.appendChild(cell);


      cell = document.createElement("td");
      songLength = library[i].duration;
      minutes = (songLength/60);
      minutes = minutes.toFixed(2);
      var duration = document.createTextNode(minutes);
      cell.appendChild(duration);
      song.appendChild(cell);

    songList.appendChild(song);
  }
}


function addAlbums() { 
  var library = [];
  library = objList.albums;
  console.log('hello : ' + library);
  for(var i = 0; i < library.length; i++){
     if ((library[i].pic == null) || (library[i].pic == "none")){
        var img = document.createElement('img');
        img.setAttribute("src", "./images/AlbumArt-01.png");
        img.classList.add("square");
        img.classList.add("albumType");
        img.setAttribute("id", library[i].pic);
        document.getElementById("mainAlbums").append(img);
    }
    else 
    {
      var img = document.createElement('img');
      img.setAttribute("src" , library[i].pic);
      img.classList.add("square");
      img.classList.add("albumType");
      img.setAttribute("id" , library[i].pic);
      document.getElementById("mainAlbums").append(img);
      console.log(img);
    }
  }
  albumButtons();
}

function albumButtons(){
  var library = [];
  library = objList.albums;
  for(var i = 0; i < library.length; i++){
    if (library[i].pic == "./images/Logo1.png"){
      continue;
    }
    else 
    {
    document.getElementById(library[i].pic).setAttribute('onclick' ,function changePlaying() {
      document.getElementById('currentAlbum').src=library[i];
    });
  }
}
}


function addPlaylists() { 
      var img = document.createElement('img');
      img.setAttribute('onclick', function newPlaylist(){
        document.getElementById("mainPlaylist").append(img);
      });
      img.src = "https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814051_1280.png"
      img.classList.add("square");
      img.setAttribute("onclick" , "current()")
      document.getElementById("mainPlaylists").append(img);
}

function addArtists() { 
  var library = [];
  library = objList.artists;
  console.log('Array Test push: ' + library)
  let artistSet = new Set();
  var artistTable = document.createElement('table');
  artistTable.classList.add("artistDisplay");

  for (var i=0; i < library.length; i++){
    artistSet.add(library[i].name);
  };

  let artistArray = Array.from(artistSet);
  artistArray.sort();
  for(var i =0; i<artistArray.length; i++){

    var row = document.createElement("tr");

    var artistName = document.createElement("td");
    var artist = document.createTextNode(artistArray[i]);
    artistName.append(artist);
    row.append(artistName);
    row.setAttribute("id" , "artist-" + artistArray[i]);
    artistTable.append(row);
  } 

  document.getElementById("mainArtists").append(artistTable);
}

function togglePlaying()
{
  document.getElementById("pause").style.display = "inline";
  document.getElementById("play").style.display = "none";
  
  var j =fetch('http://localhost:5000/api/play', {method: 'POST', mode: 'cors'});
    j.then(function(response) { //fask should have printed 
    return response.text();
    }).then(function (text) {
    console.log('POST response: ');
    console.log(text);
  });
}

function toggleStopped()
{
    
  document.getElementById("pause").style.display = "none";
  document.getElementById("play").style.display = "inline";

  fetch('http://localhost:5000/api/play', {method: 'POST', mode: 'cors'}).then(function(response) {
    console.log(response);
  });
}

function nextSong()
{
  fetch('http://localhost:5000/api/next', {method: 'GET', mode: 'cors'}).then(function(response) {
  return response.text();
  }).then(function (text) {
  console.log('POST response: ');
  console.log(text);
  });
}

function prevSong()
{
  fetch('http://localhost:5000/api/previous', {method: 'GET', mode: 'cors'}).then(function(response) { 
  return response.text();
  }).then(function (text) {
    console.log('GET response: ');
    console.log(text);
  });
}

function SetVolume(val) 
{
  var player = document.getElementById('vol-control');
  console.log('Before: ' + player.volume);
  player.volume = val / 100;
  console.log('After: ' + player.volume);

  var asJSON = JSON.stringify({'volume':val});
  console.log(asJSON)

  //POST
  fetch('http://localhost:5000/api/volume', {
            method: 'POST',
            mode: "cors",
            body: asJSON,
            headers:{
                "Content-Type": 'application/json'
            }
  }).then(function(response){
    return response.text();
  }).then(function(text){
    console.log('POST reponse: ');

    console.log(text);
  });
}

function shuffle()
{
    var j = fetch('http://localhost:5000/api/shuffle', { method: 'POST', mode: 'cors' });
    j.then(function (response) { //fask should have printed 
        return response.text();
    }).then(function (text) {
        console.log('POST response: ');
        console.log(text);
    });
}
