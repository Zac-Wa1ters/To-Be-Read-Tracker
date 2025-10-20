import React, {useState}, from 'react';
import { getBooks, addBook, deleteBook } from "./api";

function export ToBeReadTracker(){

  const [books, addBook] = useState([]);
  const [newBook, setNewBook] = useState('');



  return(<div className="book-form">

    <h1>TBR Tracker</h1>

    <div>
      <input
      type ="text"
      placeholder="Enter " />
    </div>
    
    </div>);
}

export default ToBeReadTracker


//State Management. Hold the position it's in and then the function it needs to run through 


//tbrList – current To-Be-Read books
//completedList – finished books
//newBook – controlled form inputs
//editingId – keeps track of which book is in edit mode



//useEffect to load books from your API: - this helps React sync with the backend on the first render

function handleInputChange() {

}

useEffect(() => {
  async function loadBooks() {
    const books = await getBooks();
    setTbrList(books.filter(b => !b.read));      // assuming backend tracks read status
    setCompletedList(books.filter(b => b.read)); // or store separately
  }
  loadBooks();
}, []);

//create/add a book: 

function addBook() {

}

async function handleAddBook() {
  if (!newBook.title.trim()) return;
  const added = await addBook({ ...newBook, read: false });
  setTbrList(prev => [...prev, added]);
  setNewBook({ title: "", author: "", description: "" });
}


//To view completed books, just render completedList in a separate section.

//edit a book's details

function editBook() {

}

async function handleEditBook(id) {
  await updateBook(id, newBook);
  const updated = await getBooks();
  setTbrList(updated.filter(b => !b.read));
  setCompletedList(updated.filter(b => b.read));
  setEditingId(null);
  setNewBook({ title: "", author: "", description: "" });
}


//delete a book 

function deleteBook() {

}

async function handleDeleteBook(id) {
  await deleteBook(id);
  setTbrList(prev => prev.filter(b => b.id !== id));
  setCompletedList(prev => prev.filter(b => b.id !== id));
}

//mark as read/ add to list of books you've already read

async function handleMarkAsRead(id) {
  const book = tbrList.find(b => b.id === id);
  await updateBook(id, { ...book, read: true });
  setTbrList(prev => prev.filter(b => b.id !== id));
  setCompletedList(prev => [...completedList, { ...book, read: true }]);
}


//move book up/arrow button/prioritize 

function handleMoveToTop(id) {
  setTbrList(prev => {
    const index = prev.findIndex(b => b.id === id);
    if (index === -1) return prev;
    const newList = [...prev];
    const [book] = newList.splice(index, 1);
    newList.unshift(book);
    return newList;
  });
}
