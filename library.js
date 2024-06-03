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

    library.forEach((eachBook)=>{
        let newBookRow = document.createElement('tr');
        Object.values(eachBook).forEach((value)=>{
            let newBookData = document.createElement('td');
            newBookData.textContent = value;
            newBookRow.appendChild(newBookData);
        })
        bookTable.appendChild(newBookRow);
    })

    console.log(library);

    newBookIntakeDialog.close();

})




