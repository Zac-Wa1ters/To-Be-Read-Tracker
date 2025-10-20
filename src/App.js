import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import CompletedList from "./components/CompletedList";
import { getBooks, addBook, updateBook, deleteBook } from "./api";
import ToBeReadTracker from './ToBeReadTracker.jsx';


function App() {

  return (<>ToBeReadTracker</>)
}

export default App;
