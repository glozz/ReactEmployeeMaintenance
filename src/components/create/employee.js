import React,{ Component } from 'react';
import { Navigate,Link} from 'react-router-dom';
import Swal from 'sweetalert2'

const selectList = []
  
class CreateEmployee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 'Test'};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   async componentDidMount() { 
        const url = 'https://localhost:44302/api/Person';
        fetch(url)
            .then(async response => {
               
                const data = await response.json();

                if (!selectList.length)
                {
                    data.forEach(function (result) {
                        selectList.push({value: result.personId, label : result.firstName + ' ' + result.lastName})
                    });
                }
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
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault()
        const { employeeNum, employedDate,terminatedDate } = e.target.elements
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            personId: this.state.value,
            employeeNum: employeeNum.value,
            employedDate : employedDate.value,
            terminatedDate : terminatedDate.value
           })
      };

      fetch('https://localhost:44302/api/employee',requestOptions).then(async response => {
              Swal.fire('Employee created successfully', '', 'success').then((result) => {
                window.location.href = "/";
              });
        });
    }

    render() {
      return (
        <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2>Create Employee</h2>
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Person:</label>
             <select value={this.state.value} onChange={this.handleChange} className='form-control mb-2 '>
               <option>Select...</option>
               {selectList.map((result) => (
              <option value={result.value}>{result.label}</option>
             ))}
          </select>
          </div>

          <div className="form-group">
            <label>Employee No.:</label>
            <input type="text" id="employeeNum" placeholder='Employee No.' className='form-control mb-2 '/>
          </div>
          
          <div className="form-group">
            <label>Employed Date :</label>
            <input type="date" id="employedDate" className='form-control mb-2'/>
          </div> 

          <div className="form-group">
            <label>Terminated Date :</label> 
            <input type="date" id="terminatedDate" className='form-control mb-2' />
          </div>

          <input type="submit" value="Submit"className='btn btn-info btn-block' />
          <Link to={"/"} className="btn btn-light btn-block">Back</Link>
         </form>
          </div>
        </div>
      );
    }
    
  }
  export default CreateEmployee;