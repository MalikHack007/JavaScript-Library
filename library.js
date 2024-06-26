let library = [];

function book(name, year, author, readStatus){
    this.name = name;
    this.year = year;
    this.author = author;
    this.read = readStatus;
}

let bookForm = document.querySelector('#bookForm');

let buttonToOpenDialog = document.querySelector('#openNewBookIntake');

let buttonToCloseDialog = document.querySelector('#Cancel');

let newBookIntakeDialog = document.querySelector('#addNewBook');

let bookTable = document.querySelector('.bookInfo');

buttonToOpenDialog.addEventListener('click', ()=>{
    newBookIntakeDialog.showModal();
})

buttonToCloseDialog.addEventListener('click', (e)=>{
    e.preventDefault();
    newBookIntakeDialog.close();
})

bookForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    bookTable.innerHTML = "";

    let bookNameInput = document.querySelector('#bookName');

    let authorInput = document.querySelector('#authorName');

    let bookYearInput = document.querySelector('#bookYear');

    let readStatus = document.querySelector("input[name = 'readStatus']:checked");

    let newBook = new book(bookNameInput.value, bookYearInput.value, authorInput.value, readStatus.value);

    library.push(newBook);
    //Function to build the form out of the library
    buildFormFromLibrary(library);

    bookNameInput.value = "";
    authorInput.value = "";
    bookYearInput.value = "";
    readStatus.checked = false;

    console.log(library);

    newBookIntakeDialog.close();

})


function deleteButtonSetUp(event){
    console.log('delete button clicked');
    let parentTableRow = event.target.parentNode.parentNode.parentNode;
    let bookInfoStorage = [];
    for(let i = 0; i < parentTableRow.childNodes.length - 1; i++){
        bookInfoStorage.push(parentTableRow.childNodes[i].textContent);
    }
    let identifiedBook = new book(bookInfoStorage[0], bookInfoStorage[1], bookInfoStorage[2], bookInfoStorage[3]);
    library.forEach((singleBook)=>{
        if(singleBook.name == identifiedBook.name && singleBook.year == identifiedBook.year && singleBook.author == identifiedBook.author && singleBook.read == identifiedBook.read){
            let index = library.indexOf(singleBook);
            library.splice(index, 1);
        } 
    }) //remove that book from the library array

    buildFormFromLibrary(library);
    console.log('form built');
}

function readButtonSetUp(event){
    let parentTableRow = event.target.parentNode.parentNode.parentNode;
    let bookInfoStorage = [];
    for(let i = 0; i < parentTableRow.childNodes.length - 1; i++){
        bookInfoStorage.push(parentTableRow.childNodes[i].textContent);
    }
    let identifiedBook = new book(bookInfoStorage[0], bookInfoStorage[1], bookInfoStorage[2], bookInfoStorage[3]);
    library.forEach((singleBook)=>{
        if(singleBook.name == identifiedBook.name && singleBook.year == identifiedBook.year && singleBook.author == identifiedBook.author && singleBook.read == identifiedBook.read && singleBook.read == "Not Read"){
            singleBook.read = 'Read';
        }
        
        else if (singleBook.name == identifiedBook.name && singleBook.year == identifiedBook.year && singleBook.author == identifiedBook.author && singleBook.read == identifiedBook.read && singleBook.read == "Read"){
            singleBook.read = 'Not Read';
        }
    }) //change the status to read or unread

    buildFormFromLibrary(library);
}

function buildFormFromLibrary(library){
    let deleteButton;
    let readButton;
    bookTable.innerHTML = '';
    library.forEach((eachBook)=>{
        let newBookRow = document.createElement('tr');
        Object.values(eachBook).forEach((value)=>{
            let newBookData = document.createElement('td');
            newBookData.textContent = value;
            newBookRow.appendChild(newBookData);
        })
        //if the read status is read, then give it unread button
        readButton = document.createElement('button');
        if(eachBook.read == "Not Read"){
            readButton.textContent = 'Read';
        }

        else{
            readButton.textContent = "Unread";
        }
        readButton.classList.add('readButton');
        deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteButton');
        let buttonCell = document.createElement('td');
        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonContainer');
        buttonDiv.appendChild(readButton);
        buttonDiv.appendChild(deleteButton);
        buttonCell.appendChild(buttonDiv);
        newBookRow.appendChild(buttonCell);
        bookTable.appendChild(newBookRow);
        deleteButton.addEventListener('click', deleteButtonSetUp);
        readButton.addEventListener('click', readButtonSetUp);
    })

}




