showNotes();
// Buchku bola

let buchku_img = document.getElementById('buchku');
let buchku_bola = document.getElementById('buchku_bola');

buchku_img.addEventListener('click', function () {
    buchku_bola.style.display = "block";
});

// Add note functionality
let noteBtn = document.getElementById('noteBtn');

noteBtn.addEventListener('click', addNote);

function addNote() {
    let title = document.getElementById('title').value;
    let noteTxt = document.getElementById('noteTxt').value;

    let myObj = {
        title:  title,
        noteTxt: noteTxt
    };

    if (!(noteTxt == "" || noteTxt == null)) {
        // knowing notes status at localstorage
        let notes = [];
        if (localStorage.getItem('notes') != null) {
            notes = JSON.parse(localStorage.getItem('notes'));
        }

        //  adding note
        notes.push(myObj);
        localStorage.setItem('notes', JSON.stringify(notes));
        
        showNotes(); // for showing notes on app


        document.getElementById('noteTxt').value = ""; // removing value from txta



    } else {
        document.getElementById('noteTxt').placeholder = "मेरे भाई कुछ लिख ले यहाँ फिर बटन दबा ";
    }

}



// Show notes functionality

function showNotes() {
  let noteObj = JSON.parse(localStorage.getItem('notes'));

  html = ``;
  if(!(noteObj == null)){

    Array.from(noteObj).forEach(function (note, index){
       html += ` <div class="card">
       <div class="card-body">
         <h5 class="card-title"> ${note.title}</h5>
         <p class="card-text mycard">${note.noteTxt}</p>
         <button id= "${index}" onclick= "deleteNote(this.id)" class="deleteBtn bg-danger">Delete</button>
       </div>
     </div>`;
    });

}
document.getElementById('showNote').innerHTML = html;
   
}


// delete note functionality

function deleteNote(id){
    let noteObj = JSON.parse(localStorage.getItem('notes'));
    noteObj.splice(id,1);
    localStorage.setItem('notes', JSON.stringify(noteObj));
    showNotes();
}


// search functionality
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('card');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})