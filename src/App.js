import './App.css';
import BookForm from "./components/BookForm";
import { useState, useEffect } from "react";
import { getBooks, addBook, updateBook, deleteBook } from "./BookAPI";

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

  //// Add
async function handleAddBook(newBook) {
  const tempId = `tmp-${Date.now()}`;
  const optimisticItem = { id: tempId, ...newBook };
  setBooks(prev => [...prev, optimisticItem]);

  try {
    const serverItem = await addBook(newBook);
    const normalized =
      serverItem?.data_json?.body ??
      serverItem?.data_json ??
      serverItem?.body ??
      serverItem ?? newBook;

    const finalItem = {
      id: serverItem?.id ?? tempId,
      title: normalized.title ?? "",
      author: normalized.author ?? "",
      description: normalized.description ?? "",
    };

    setBooks(prev =>
      prev.map(b => (b.id === tempId ? finalItem : b))
    );
  } catch (error) {
    console.error("Failed to add book:", error);
    setBooks(prev => prev.filter(b => b.id !== tempId));
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

    const optimistic = { ...current, ...patch };
    setBooks(prev => prev.map(book => (book.id === bookId ? optimistic : book)));

    try {
      await updateBook(bookId, patch);
    } catch (error) {
      console.error("Failed to update book:", error);
      setBooks(prev => prev.map(book => (book.id === bookId ? current : book)));
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
      setBooks(prev => prev.filter(b => b.id !== bookId));
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  }

  //// Render
  return (
    <div className="app">
      <h1>My To-Be-Read List</h1>
      <ol>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
            <p>{book.description}</p>
            <button onClick={() => handleUpdateBook(book.id)}>Update</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ol>

      <h1>Add Book</h1>
      <BookForm onAddBook={handleAddBook} />
    </div>
  );
}

export default App;
