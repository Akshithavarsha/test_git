

// Add note to local storage like storing it in a variable
let addBtn = document.getElementById("add-btn"); //add button id 
addBtn.addEventListener("click", function(e) {    //once clicked

  let addTitle = document.getElementById("note-title");  
  let addTxt = document.getElementById("note-text");
  
    if (addTitle.value == "" || addTxt.value == "") {
        return alert("Please add Note Title and Details")  //check title or text is blank or not
    }

  let notes = localStorage.getItem("notes");  //create local storage place to store the notes
  if (notes == null) {
    notesObj = [];        // if null - create empty obj list
  } else {                        //convert the string already present into object
    notesObj = JSON.parse(notes); /*When receiving data from a web server, the data is always a string.
    Parse the data with JSON.parse(), and the data becomes a JavaScript object.*/
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value           //get title and text and store it as dict
  }
  notesObj.push(myObj);         //push title & text into notesobj
  localStorage.setItem("notes", JSON.stringify(notesObj)); //convert obj into string
  addTxt.value = "";        //return the empty value to the text and title in the front end
  addTitle.value = "";
//   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {    //
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = ""; //html hold all notes in dict formate
  notesObj.forEach(function(element, index) {  // for each element in notesobj
    html += `
        <div class="note">
            <p class="note-counter">Note ${index + 1}</p>
            <h3 class="note-title"> ${element.title} </h3>
            <p class="note-text"> ${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
            <button id="${index}"onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note</button>
        </div>
            `;
  });
  let notesElm = document.getElementById("notes");  //stored notes visualization part
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);
    let confirmDel = confirm("Delete this note?"); //like alert
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes"); //check?
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1); //replace 1 element at index
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
  
}

// Function to Edit the Note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("note-text");

    if (addTitle.value !== "" || addTxt.value !== "") {   //alert to clear the text region
      return alert("Please clear the form before editing a note")
    } 

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    notesObj.findIndex((element, index) => {
      addTitle.value = element.title;
      addTxt.value = element.text;
    })
    notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
}


showNotes();