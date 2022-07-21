import ShelfSelector from "./ShelfSelector";

const Book = ({book,onChangeShelf}) => {

    let imageURL;

    if ( book.imageLinks === undefined )
    {
        imageURL='';

    }
    else{
        imageURL=book.imageLinks.thumbnail;
    }
    


return(
<div className="book">
    <div className="book-top">
        <div
            className="book-cover"
            style={{
                width: 128,
                height: 193,
                backgroundImage:`url(${imageURL})` }}
        ></div>
        <ShelfSelector onChangeShelf={onChangeShelf} book={book}/>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.authors}</div>
</div>)
}
export default Book;