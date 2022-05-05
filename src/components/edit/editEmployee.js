import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useParams,Link } from "react-router-dom";
import Swal from 'sweetalert2'

const EditUser = () => {

  
  const selectList = []
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    employeeId : "",
    personId: "",
    employeeNum: "",
    employedDate: "",
    terminatedDate: "",
    fullName: ""
  });

  const { employeeId,personId, employeeNum, employedDate, terminatedDate, fullName } = employee;
  const onInputChange = e => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadEmployee();
    loadPersonList();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`https://localhost:44302/api/Employee/${id}`, employee);

    Swal.fire('Employee updated', '', 'success').then((result) => {
      window.location.href = "/";
    });
  };

  const loadEmployee = async () => {
    const result = await axios.get(`https://localhost:44302/api/Employee/${id}`);
    setEmployee(result.data);
  };

  const loadPersonList = async () => {
    const result = await axios.get(`https://localhost:44302/api/Person`);
    result.data.forEach(function (result) {
        selectList.push({value: result.personId, label : result.firstName + ' ' + result.lastName})
    });
    console.log(result);
  };
  
  return (
    
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Employee</h2>
        <form onSubmit={e => onSubmit(e)}>
        <input
              type="text"
              className="form-control form-control-lg"
              name="employeeId"
              value={employeeId}
              hidden='hidden'
            />
        <div className="form-group">
        <lable>Person list</lable>
        <select className='form-control mb-2 ' disabled >
               <option value={personId}>{fullName}</option>
               {selectList.map((result) => (
              <option value={result.value}>{result.label}</option>
             ))}
            </select> 
         </div>
          <div className="form-group">
            <lable>Employee no.</lable>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your employee no."
              name="employeeNum"
              value={employeeNum}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          <lable>Employed Date</lable>
            <input
              type="date"
              className="form-control form-control-lg"
              name="employedDate"
              value={employedDate}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          <lable>Terminated Date</lable>
            <input
              type="date"
              className="form-control form-control-lg"
              name="terminatedDate"
              value={terminatedDate}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update Employe</button>
          <Link to={"/"} className="btn btn-light btn-block">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
