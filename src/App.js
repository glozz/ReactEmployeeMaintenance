import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link } from 'react-router-dom';
import Person from './components/create/person'
import Employee from './components/create/employee'
import PersonIndex from './components/read/personIndex'
import EmployeeIndex from './components/read/employeeIndex'
import EditEmployee from './components/edit/editEmployee'
function App() {
  return (

<div className="container">
<nav className='navbar navbar-expand navbar-dark bg-dark'>
  <div className='navbar-nav mr-auto'>
  <li className='nav-item'>
    <Link to={"/"} className="nav-link">Home</Link>
  </li>
  <li className='nav-item'>
    <Link to={"/personIndex"} className="nav-link">Person</Link>
  </li> 
  </div>
</nav> 
 <div className='container'>
<Routes>
  <Route path='/Employee' element={<Employee/>}/>
  <Route path='/Person' element={<Person/>}/>
  <Route path='/PersonIndex' element={<PersonIndex/>}/>
  <Route path='/' element={<EmployeeIndex/>}/>
  <Route path='/editEmployee/:id' element={<EditEmployee/>}/>
</Routes>
 </div>
</div>
);
}

export default App;
