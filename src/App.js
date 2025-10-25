import './App.css';
import BookForm from "./components/BookForm.js";
import { useState, useEffect } from "react";
import { getBooks, addBook, updateBook, deleteBook } from "./BookAPI";
import ToBeReadTracker from "./components/TBR TRACKER/ToBeReadTracker.jsx";


//// Component
function App() {

  const [books, setBooks] = useState([]);

  //// Load
  useEffect(() => {
    async function fetchBooks() {
      try {
        const allBooks = await getBooks();
        setBooks(allBooks);
      } catch (error) {
        console.error("Failed to load books:", error);
      }
    }
    fetchBooks();
  }, []);
   useEffect(() => {
  const title = document.getElementById("title");
  if (!title) return;

  let glow = 0;
  let increasing = true;
  let animationFrameId;

  function animateGlow() {
    if (increasing) {
      glow += 0.5;
      if (glow >= 10) increasing = false;
    } else {
      glow -= 0.5;
      if (glow <= 0) increasing = true;
    }
    title.style.textShadow = `0 0 ${glow}px gold`;
    animationFrameId = requestAnimationFrame(animateGlow);
  }

  animateGlow();

  return () => cancelAnimationFrame(animationFrameId);
}, []);


//Reload list when adding to list so page always shows server truth instead of loading optimistcally as before

async function reloadBooks() {
  try {
    const all = await getBooks();
    setBooks(all);
  } catch (err) {
    console.error("Failed to reload books:", err);
  }
}


  //// Add
async function handleAddBook(newBook) {
  try {
    await addBook(newBook);
    await reloadBooks();
  } catch (error) {
    console.error("Failed to add book:", error);
  }
}


  //// Update
  async function handleUpdateBook(bookId) {
    const current = books.find(book => book.id === bookId);
    if (!current) return;

    const title = prompt("New title:", current.title);
    const author = prompt("New author:", current.author);
    const description = prompt("New description:", current.description);
    if (title == null && author == null && description == null) return;

    const patch = {
      title: title ?? current.title,
      author: author ?? current.author,
      description: description ?? current.description,
    };

    try {
      await updateBook(bookId, patch);
      await reloadBooks();
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  }

  //// Delete
  async function handleDeleteBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${book.title}" by ${book.author}?`
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);
      await reloadBooks();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  }

  //// Render
  return (
    <div className="app">
      <h1 id= "title">The Library</h1>
      <ToBeReadTracker />
      <ol className="book-list">
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
            <p>{book.description}</p>
            <button onClick={() => handleUpdateBook(book.id)}>Update</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ol>

      <h2>New Book</h2>
      <BookForm onAddBook={handleAddBook} />
    </div>
  );
}


export default App;
