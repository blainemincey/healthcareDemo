import React, { Component } from 'react';
import 'whatwg-fetch';
import { render } from 'react-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { RadioGroup, RadioButton} from "react-radio-buttons";
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

class UserRole extends Component {

  constructor(props) {
    super(props);

    // start off with no data
    this.state = {
      data: []
    }

    this.onChange = this.onChange.bind(this);

    // logic added to handle moving away from page if request is still active
    this.abortableFetch = ('signal' in new Request('') ? window.fetch : fetch);
    this.controller = new AbortController();
  }

  // when page loads
  componentDidMount() {
    this.setState({
      data: this.fetchPatients('provider')
    })
  }

  // abort fetch is this method is called
  componentWillUnmount() {
    this.controller.abort();
  }

  // interface to back-end api
  fetchPatients(username) {

    let data = {user:username}

    fetch('api/patientsApi/getPatients', {
      signal: this.controller.signal,
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
      .catch(function (ex) {
        if(ex.name === 'AbortError'){
          console.log('request aborted');
        }
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
        <h4>User Role (Demo of Stitch Rules)</h4>
        <RadioGroup onChange={ this.onChange } horizontal value="Provider">
          <RadioButton value="provider" pointColor="black">Provider</RadioButton>
          <RadioButton value="pharmacy" pointColor="black">Pharmacy</RadioButton>
          <RadioButton value="payer" pointColor="black">Payer</RadioButton>
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
            },
            {
              Header: "Marital Status",
              id: "MARITAL",
              accessor: d=> d.MARITAL
            },
            {
              Header: "Race",
              id: "RACE",
              accessor: d=> d.RACE
            },
            {
              Header: "Gender",
              id: "GENDER",
              accessor: d=> d.GENDER
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
