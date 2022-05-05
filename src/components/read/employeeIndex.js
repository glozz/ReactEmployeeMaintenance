
import React,{ Component,useState  } from 'react';
import { Link } from "react-router-dom";
import { Alert, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

var employeeResult = [];

class EmployeeIndex extends React.Component {
  
  async componentDidMount() {

     const url = 'https://localhost:44302/api/Employee';
     fetch(url)
         .then(async response => {
 
             const data = await response.json();
             employeeResult = data;
             // check for error response
            if (!response.ok) {
                 // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;

              return Promise.reject(error);
            }

             this.setState({ totalReactPackages: data.total })
        })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
           console.error('There was an error!', error);
        });
}

async deleteEmployee(id) {
  Swal.fire({
    title: 'Are you sure you want to delete?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://localhost:44302/api/Employee/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async response => {
        if(response.ok)
        {
          Swal.fire('Employee Deleted!', '', 'success');
          window.location.reload(false);
        }
        else
        {
          Swal.fire('Failed to delete Employee!', '', 'error')
        }
      })
    } else if (result.isDenied) {
    }
  })
 }

  render() {
    return (
      <div className='main-section mt-1'>

      {employeeResult.length > 0 ? (
        <>
           <Table className='table'>
          <caption>
             <Link to={"/employee"} className="btn btn-primary ml-1">Create Employee</Link>
           </caption>
         <thead>
        <tr>
         <th>#</th>
         <th>Employee Full name</th>
         <th>Employee No.</th>
         <th>Employed Date</th>
         <th>Terminated Date</th>
         <th>Actions</th>
      </tr>
          </thead>
         <tbody>
          {employeeResult.map((employee, index) => (  
       <tr data-index={employee.employeeId}> 
        <td>{index + 1}</td>
        <td>{employee.fullName}</td>  
         <td>{employee.employeeNum}</td>  
         <td>{employee.employedDate}</td>  
         <td>{employee.terminatedDate}</td>  
         <td>
           <Link className='btn btn-info px-2' to={"/editEmployee/" + employee.employeeId} >Edit</Link>
           <button className="btn btn-danger ml-1" type='button' onClick={(e) => this.deleteEmployee(employee.employeeId)}>
                    Delete
           </button>
         </td>
       </tr>  
           ))}   
         </tbody>
        </Table>
        </>
        ) : (
        <>
          <Alert variant="info">
            <Alert.Heading>No records to display</Alert.Heading>
           </Alert>
        <Link to={"/employee"} className="btn btn-primary ml-1 create">Create Employee</Link>
       </>
  )}
  </div>
  )}
}
export default EmployeeIndex;

