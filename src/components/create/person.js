import React,{ Component } from 'react';
import { Navigate,Link} from 'react-router-dom';
import Swal from 'sweetalert2'

class CreatePerson extends React.Component {

    handleSubmit(e) {
        e.preventDefault()
        const {firstName, lastName, birthDate } = e.target.elements
        fetch('https://localhost:44302/api/Person', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
             firstName: firstName.value,
             lastName: lastName.value,
             birthDate : birthDate.value
           })
        })
        Swal.fire('Person created successfully', '', 'success')
        window.location.href = "/personIndex";
    }

    render() {
      return (
        <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Create Person</h2>
            <form onSubmit={this.handleSubmit}>
               
            <div className="form-group">
              <label> First Name:</label>
              <input type="text" id="firstName" placeholder='First Name' className='form-control form-control-lg'/>
            </div>

            <div className="form-group">
            <label>Last Name:</label>
              <input type="text" id="lastName" placeholder='Last Name' className='form-control form-control-lg'/>
             </div>
             <div className="form-group">
            <label>Date Of Birth:</label>
              <input type="date" id="birthDate" className='form-control form-control-lg'/>
            </div> 

              <input type="submit" className="btn btn-info btn-block" value="Submit"/>
              <Link to={"/PersonIndex"} className="btn btn-light btn-block">Back</Link>
         </form>
          </div>
        </div>
      );
    }
  }

  export default CreatePerson;