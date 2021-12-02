console.log("Welcome to take notes");
saveNotes();


addbtn.addEventListener("click", () => {
  let txtarea = document.getElementsByClassName("txtarea")[0];
  let titletext = document.getElementsByClassName("title")[0];
  let notes = localStorage.getItem("notes");
  let alert = document.getElementsByClassName("alert")[0];
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  };

  let myObj = {
      title: titletext.value, 
      text: txtarea.value
  };
  if (txtarea.value != 0 || titletext.value != 0) {
    alert.innerHTML = "";
    noteObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    txtarea.value = "";
    titletext.value = "";
    saveNotes();
  } else {
    let massage = `Please Enter Something to Add Notes`;
    alert.innerHTML = massage;
  }

  
});

function saveNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let html = "";

  noteObj.forEach((element, index) => {
    html += `
        <div class="card my-2 mx-2 notecards" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <a href="#" id="${index}" onclick = "deletenote(this.id)" class="btn btn-primary">Delete Note</a>
            </div>
        </div>
        `;
  });
  let noteElmn = document.getElementById("notes");
  if (notes != 0) {
    noteElmn.innerHTML = html;
  } else {
    noteElmn.innerHTML = `Nothing to Show`;
  }
}

const deletenote = (index) => {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteObj));

  saveNotes();
};

let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", () => {
  let inputvalue = searchBar.value;
  let cards = document.getElementsByClassName("notecards");
  Array.from(cards).forEach((element) => {
    let cardPara = element.getElementsByTagName("p")[0].innerText;
    console.log(cardPara);
    if (cardPara.includes(inputvalue)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

const deleteAllnote = () => {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.splice(0, noteObj.length);
  localStorage.setItem("notes", JSON.stringify(noteObj));

  saveNotes();
};
