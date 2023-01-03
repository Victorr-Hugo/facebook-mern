import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { LandPage, MarketPlace, SignIn, UserPage, MarketPlaceForm, Groups, CreateGroup, Group, Post, Friends, Messenger } from './pages'

function App() {
  const auth = localStorage.getItem('user')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={!auth ? <SignIn/> : <Navigate to='/'/>}/>
        <Route path='/' element={auth ? <LandPage/> : <Navigate to='/signin'/>}/>
        <Route path='/friends' element={auth ? <Friends/> : <Navigate to='/signin'/>}/>
        <Route path='/user/:username' element={auth ? <UserPage/> : <Navigate to='/signin'/>}/>
        <Route path='/marketplace' element={auth ? <MarketPlace/> : <Navigate to='/signin'/>}/>
        <Route path='/marketplace/create/item' element={auth ? <MarketPlaceForm/> : <Navigate to='/signin'/>}/>
        <Route path='/groups' element={auth ? <Groups/> : <Navigate to='/signin'/>}/>
        <Route path='/groups/create' element={auth ? <CreateGroup/> : <Navigate to='/signin'/>}/>
        <Route path='/group/:id' element={auth ? <Group/> : <Navigate to='/signin'/>}/>
        <Route path='/post/:id' element={auth ? <Post/> : <Navigate to='/signin'/>}/>
        <Route path='/messenger' element={auth ? <Messenger/> : <Navigate to='signin'/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
