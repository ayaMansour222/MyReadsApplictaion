import { update } from "../BooksAPI"
import React, { useEffect, useState } from "react";
import BookShelf from "../components/BookShelf";
import { Link } from "react-router-dom";

const HomePage=  ({myBooks,updateMyBooks})=>{
  
  const [currentlyReadingShelf_Books,setCurrentlyReadingShelf_Books]=useState([]);
  const [wantToReadShelf_Books,setWantToReadShelf_Books]=useState([]);
  const [ReadShelf_Books,setReadShelf_Books]=useState([]);


  useEffect(() => {
  
      setCurrentlyReadingShelf_Books(myBooks.filter(b=>b.shelf === 'currentlyReading'));
      setWantToReadShelf_Books(myBooks.filter(b=>b.shelf === 'wantToRead'));
      setReadShelf_Books(myBooks.filter(b=>b.shelf === 'read'));
 
  },[myBooks]);

  

  const onChangeShelf = async (book, shelf) => {
    const result = await update(book, shelf);

    myBooks.map(b => {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
      return b;

    });

    setCurrentlyReadingShelf_Books(myBooks.filter(b => result.currentlyReading.includes(b.id)));
    setWantToReadShelf_Books(myBooks.filter(b => result.wantToRead.includes(b.id)));
    setReadShelf_Books(myBooks.filter(b => result.read.includes(b.id)));
    updateMyBooks(myBooks);
  }
  
    return(
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf shelfBooks={currentlyReadingShelf_Books} shelfTitle={'Currently Reading'} onChangeShelf={onChangeShelf} />
              <BookShelf shelfBooks={wantToReadShelf_Books} shelfTitle={'Want to Read'} onChangeShelf={onChangeShelf}/>
              <BookShelf shelfBooks={ReadShelf_Books} shelfTitle={'Read'} onChangeShelf={onChangeShelf}/>
             
            </div>
          </div>
          <div className="open-search">
            <Link to='/search' >Add Book</Link>
          </div>
        </div>
      
    )
}
export default HomePage;