import cover from "../../assets/book.jpg";
import {useState} from 'react'
import "./ToBeReadTracker.css";

// import cover from './images/book.jpg';
// <img src = {book}/>

// import image1 from './images/image1.jpg';
// <img src={image1} /

// export default function ToBeReadTracker() {
//   return (
//     <div className="tbr-tracker">
//       <h2 className="tbr-heading">To Be Read List</h2>
//     </div>
//   );
// }

function ToBeReadTracker(){

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState('');

  function handleInputChange(event){
  }

  function addBook(){

  }

  function deleteBook(index){

  }

  function moveBookUp(index){

  }

  function moveBookDown(index){
    
  }

  return(
  <div className="book">

    <div class="center-left">Books</div>
    <img src = {cover}/>
    <div class="book-number">1</div>
    <div class="book-number-2">2</div>

    {/* <div class="edit-button"><button>Edit Page</button></div> */}
    {/* <a href = "addbooks" target = "_blank_">
      <div class="add-button"><button>Add Book</button></div> */}
    {/* </a> */}
    <div>
      {/* <input
        type = "text"
        placeholder = "Enter a title: "
        value = {newBook}
        onChange = {handleInputChange}/> */}
    </div>

    
    </div>
    )
}

export default ToBeReadTracker



