import "./App.css";
import { useState,useEffect } from "react";
import SearchPage  from "./pages/search";
import HomePage from "./pages/home";
import { Routes,Route } from "react-router-dom";
import {getAll} from './BooksAPI'

function App() {

  const [myBooks,setMybooks]=useState([]);

  const getMyBooks = async () => {
    const  data  = await getAll();
    setMybooks(data); 
  };

  const updateMyBooks=(myBooks)=>{
    setMybooks(myBooks);
  }

  useEffect(() => {
    getMyBooks();
  }, []);


  return (

      <Routes>
        <Route  path='/' element={<HomePage myBooks={myBooks} updateMyBooks={updateMyBooks} />}></Route>
        <Route path='/search' element={<SearchPage myBooks={myBooks} updateMyBooks={updateMyBooks} />}></Route>
      </Routes>
  );
}
export default App;
