import React from 'react';
import LoginPage from './pages/auth/login';
import Register from './pages/auth/register';
import Dashboard from './pages/dashboard';
import Catalog from './pages/catalog/index';
import CatalogById from './pages/catalog/id';
import Admin from './pages/admin/login';
import RegisterAdmin from './pages/admin/registeramin';

import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Outlet
} from 'react-router-dom';

const RequiredAuth = () => {
 let isAuth = localStorage.getItem('access_token');

 if(!isAuth){
   return <Navigate to="./register"/>
 }
 return <Outlet/>
}

export default function App (){

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* {Public Routes} */}
      <Route path="/admin" element={<Admin/>} />
      <Route path="/registeradmin" element={<RegisterAdmin/>} />
      <Route path="/" element={<LoginPage/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/catalog">
        <Route path=":id" element={<CatalogById/>}/>
        <Route index element= {<Catalog/>} />
      </Route>
      <Route element={<RequiredAuth/>} >
        <Route index path="/dashboard" element= {<Dashboard/>} />
       </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}
