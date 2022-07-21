const ShelfSelector = ({onChangeShelf,book}) => {





return(
<div className="book-shelf-changer">
<select onChange={e => onChangeShelf(book,e.target.value)} defaultValue={"none"} value={book.shelf}>
  <option value="no" disabled >
    Move to...
  </option>
  <option value="currentlyReading">Currently Reading</option>
  <option value="wantToRead">Want to Read</option>
  <option value="read">Read</option>
  <option value="none">None</option>
  
</select>
</div>)
}
export default ShelfSelector;