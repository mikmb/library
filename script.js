const myLibrary = [];
const table = document.querySelector("tbody");
const addBookBtn = document.querySelector(".add-book-btn");
const addBookDialog = document.querySelector("#add-book-dialog");
const addBookButtonDialog = document.querySelector("#dialog-add-book-btn");
const formFields = document.querySelectorAll(".form-field");

function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggleRead = function () {
    this.read = !this.read;
  };
}
function addBookToLibrary(title, author, pages, read) {
  const newBook = new book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary("Solar System", "Jill McDonald", 26, true);
addBookToLibrary("Ocean Life", "Jill McDonald", 26, true);
addBookToLibrary("Dinosaurs", "Jill McDonald", 26, true);
addBookToLibrary("Plant The Tiny Sees", "Christie Matheson", 42, true);

function clearModalForm() {
  formFields.forEach((field) => {
    field.value = "";
  });
}
addBookBtn.addEventListener("click", () => {
  addBookDialog.showModal();
  clearModalForm();
});
function clearTable() {
  table.innerHTML = "";
}
function displayBooks() {
  clearTable();
  myLibrary.forEach((book, index) => {
    const row = table.insertRow();
    // Create table cell and add data to cell
    const titleCell = row.insertCell();
    titleCell.textContent = book.title;

    const authorCell = row.insertCell();
    authorCell.textContent = book.author;

    const pagesCell = row.insertCell();
    pagesCell.textContent = book.pages;

    const readCell = row.insertCell();
    readCell.textContent = book.read ? "Yes" : "No";

    // Create remove button (remove book from myLibrary array)
    const removeCell = row.insertCell();
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("id", "remove-button");
    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });
    removeCell.appendChild(removeButton);

    // Add button to toggle read status
    const toggleReadCell = row.insertCell();
    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = "Toggle Read";
    toggleReadButton.setAttribute("id", "toggle-read-button");
    toggleReadButton.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });
    toggleReadCell.appendChild(toggleReadButton);
  });
}

displayBooks();

addBookButtonDialog.addEventListener("click", (e) => {
  const form = document.querySelector("#add-book-form");
  const formErrors = form.checkValidity();
  // Retrieve form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  // Add book to myLibrary and update the table
  if (form.checkValidity()) {
    addBookToLibrary(title, author, pages, read);
  }

  displayBooks();
});
