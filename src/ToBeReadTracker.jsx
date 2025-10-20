import {useState} from 'react'

function ToBeReadTracker(){

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState('')



  return(<div className="book-form">

    <h1>TBR Tracker</h1>

    <div>
      <input
      type ="text"
      placeholder="Enter a title: " />
    </div>
    
    </div>)
}

export default ToBeReadTracker


