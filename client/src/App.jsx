import React from 'react'
import { Route,Routes } from 'react-router-dom';
import {Home }from './pages/Home.jsx';
import {EditBook} from './pages/EditBook.jsx';
import {DeleteBook} from './pages/DeleteBook.jsx';
import {ShowBooks }from './pages/ShowBooks.jsx';
import {CreateBook} from './pages/CreateBook.jsx';
import {AuthPage} from './pages/AuthPage.jsx';


const App = () => {
  return (
    <Routes>
       <Route path="/register" element={<AuthPage isRegister={true} />} />
       <Route path="/login" element={<AuthPage isRegister={false} />} />
       <Route path="/" element={<AuthPage isRegister={false} />} />
      <Route path='/home' element={<Home/>}/>     
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/details/:id' element={<ShowBooks/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
    </Routes>
  )
}

export default App
// import React from 'react'

// const App = () => {
//   return (
//     <div>
//       HIIII
//     </div>
//   )
// }

// export default App

