import { useState } from "react";
import { search } from "../BooksAPI";
import Book from "../components/Book";
import { update } from "../BooksAPI";
import { Link } from "react-router-dom";


const SearchPage = ({ myBooks, updateMyBooks }) => {

  var text = '';
  var emptySearchResult = false;
  const [searchResult_Books, setsearchResult_Books] = useState([]);

  const onChangeSearchText = async (event) => {

    text = event.target.value;
    const result = await search(text);
   
    if (result === undefined) {
      emptySearchResult = true;
      setsearchResult_Books([]);

    }
    else {
      if (result.error === 'empty query') {
        emptySearchResult = true;
        setsearchResult_Books([]);
      }
      else {
        emptySearchResult = false;
        myBooks.forEach(element => {
          result.map(b => {
            if (b.id === element.id) {
              b.shelf = element.shelf;
            }
            return b;

          });
        });

        setsearchResult_Books(result);

      }

    }

  }





  const onChangeShelf = async (book, shelf) => {

    await update(book, shelf);

    if (myBooks.some(b => b.id === book.id)) {
      myBooks.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
        return b;

      });
    }
    else {

      book.shelf = shelf;
      myBooks.push(book);
    }

    updateMyBooks(myBooks);
  }


  return (
    <div className="search-books">
      <div className="search-books-bar">

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={onChangeSearchText}
          />
        </div>
      </div>
      <div className="search-books-results">
        {emptySearchResult ? (<p></p>) : (
          <ol className="books-grid">
            {
              searchResult_Books.map((book) =>
                <li key={book.id}>
                  <Book book={book} onChangeShelf={onChangeShelf} />
                </li>
              )
            }
          </ol>)
        }
        <div className="close-search">
          <Link to='/' >To My Library</Link>
        </div>
      </div>
      
    </div>
  )

}
export default SearchPage;