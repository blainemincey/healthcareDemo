import React, { Component } from 'react';
import 'whatwg-fetch';
import { render } from 'react-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { RadioGroup, RadioButton} from "react-radio-buttons";

class UserRole extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.fetchPatients('provider')
    };

    this.onChange = this.onChange.bind(this);

  }

  // interface to back-end api
  fetchPatients(username) {

    let data = {user:username}

    fetch('api/patientsApi/getPatients', {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json
        })
      })
      .catch(error => {
        console.log("Fetch Patients failed.", error);
      })
  };

  // function for the radio button selection
  onChange(username) {
    console.log("This is selected: " + username);
    this.setState({
      data:this.fetchPatients(username)
    })
  }


  render() {
    const {data} = this.state;
    return (
      <div>
        <h4>User Role</h4>
        <RadioGroup onChange={ this.onChange } horizontal value="Provider">
          <RadioButton value="provider" pointColor="black">Provider</RadioButton>
          <RadioButton value="pharmacy" pointColor="black">Pharmacy</RadioButton>
          <RadioButton value="other" pointColor="black">Other</RadioButton>
        </RadioGroup>

        <ReactTable
          data={data}
          noDataText="Retrieving Patient Data..."
          columns={[
            {
              Header: "Patient ID",
              id: "PATIENT_ID",
              accessor: d => d.PATIENT_ID
            },
            {
              Header: "First",
              id: "FIRST",
              accessor: d => d.FIRST
            },
            {
              Header: "Last",
              id: "LAST",
              accessor: d => d.LAST
            }


          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br/>
      </div>
    );
  }
}

export default UserRole;
