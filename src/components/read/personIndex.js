
import React,{ Component,useState  } from 'react';
import { Alert,Button, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

var personResult = [];

class PersonIndex extends React.Component {

  async componentDidMount() {
     const url = 'https://localhost:44302/api/Person';
     fetch(url)
         .then(async response => {
 
             const data = await response.json();
             personResult = data;
             console.log(personResult);
             // check for error response
            if (!response.ok) {
                 // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
              debugger

              return Promise.reject(error);
            }

             this.setState({ totalReactPackages: data.total })
        })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
           console.error('There was an error!', error);
        });
}
  render() {
    return (
      <div className='main-section mt-1'>

        {personResult.length > 0 ? (
        <>
        <Table className='table'>
        <caption>
            <Link to={"/person"} className="btn btn-primary ml-1">Create Person</Link>
</caption>
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Birth Date</th>
    </tr>
  </thead>
  <tbody>
     {personResult.map((person, index) => (  
       <tr data-index={person.personId}>  
         <td>{person.firstName}</td>  
         <td>{person.lastName}</td>  
         <td>{person.birthDate}</td>
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
          <Link to={"/person"} className="btn btn-primary ml-1 create">Create Person</Link>
         </>
    )}
</div>
    )}
}
export default PersonIndex;

