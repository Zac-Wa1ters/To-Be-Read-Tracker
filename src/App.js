//THIS VERSION SHOULD WORK. THAT WOULD BE NICE.

import './App.css';
import ToBeReadTracker from './ToBeReadTracker';
import BookForm from "./components/BookForm";
import { useState } from "react";

function App() {

  const [books, setBooks] = useState([]);

  function addBook(book) {
    setBooks([...books, book]);
  }

  return (
    <div className="app">
      <h1>Add Book</h1>

      {/* your BookForm */}
      <BookForm onAddBook={addBook} />

      {/* optional tracker component */}
      <ToBeReadTracker />

      {/* your book list display */}
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <strong>{book.title}</strong> by {book.author}
            <p>{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
