import { useState } from 'react'
import { BrowserRouter as Router ,Route , Routes } from 'react-router-dom'
import Side from './Components/Partials/Side';
import Navbar from './Components/Partials/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import AllUsers from './Components/Users/AllUsers';
import Login from './Components/Auth/Login';

import  { LoginContext }  from './LoginContext'
import MoreDetails from './Components/Users/MoreDetails';
import Banner from './Components/Banners/Banner';
import SingleListing from './Components/Users/SingleListing';
import AddUser from './Components/Users/AddUser';
import Reports from './Components/Reports/Reports';
import Notification from './Components/Notification/Notification';
import Support from './Components/Support/Support';
import AddBanner from './Components/Banners/AddBanner';
import ReportDetail from './Components/Reports/ReportDetail';
import AdminProfile from './Components/Admin/AdminProfile';
import Protected from './Protected';
import Category from './Components/Categories/Category';
import SubCategory from './Components/Categories/SubCategory';
function App() {
  const[loginstatus,setLoginstatus] = useState(localStorage.getItem('loginstatus'))
  const[expirationTime,setExpTime] =useState(localStorage.getItem('expirationTime'))
  if(loginstatus && expirationTime && Date.now() > Number(expirationTime)){
    localStorage.removeItem('loginstatus');
    localStorage.removeItem('expirationTime');
  }
  return ( 
    <>
     <LoginContext.Provider value={{loginstatus,setLoginstatus,expirationTime,setExpTime}}>
    <Router>
      <Routes>
        <Route path='/' element={ <Protected Component={Dashboard}/> }></Route>
        <Route path='/admin/profile' element={<Protected Component={AdminProfile}/>}></Route>
        <Route path='/users' element={<Protected Component={AllUsers}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/users/moreDetails/:userId/:page' element={<Protected Component={MoreDetails}/>}></Route>
        <Route path='/banner' element={<Protected Component={Banner}/>}></Route>
        <Route path='/banner/add-banner' element={<Protected Component={AddBanner}/>}></Route>
        <Route path='/users/listing/:listId' element={<Protected Component={SingleListing}/>}></Route>
        <Route path='/users/request/:userRequestId' element={<Protected Component={SingleListing}/>}></Route>
        <Route path='/users/add-user' element={<Protected Component={AddUser}/>}></Route>
        <Route path='/reports' element={<Protected Component={Reports}/>}></Route>
        <Route path='/reports/moreDetails' element={<Protected Component={ReportDetail}/>}></Route>
        <Route path='/notification' element={<Protected Component={Notification}/>}></Route>
        <Route path='/support' element={<Protected Component={Support}/>}></Route>
        <Route path='/category' element={<Protected Component={Category}/>}></Route>
        <Route path='/category/subCategory/' element={<Protected Component={SubCategory}/>}></Route>
    
      </Routes>
    </Router>
    </LoginContext.Provider>
    </>
   );
}

export default App;