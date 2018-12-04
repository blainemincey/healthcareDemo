import React, {Component} from 'react';

// Placeholder for prescription
class Prescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      prescriptionName: '',
      filled: '',
      errors: {},
      response: ''
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
  }

  // interface to back-end api
  postPrescription() {

    let data = {firstName : this.state.firstName,
                lastName  : this.state.lastName,
                prescriptionName : this.state.prescriptionName,
                filled : this.state.filled };

    fetch('api/prescriptionApi/newPrescriptionFromUI', {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          response : JSON.stringify(json)
        });
      })
      .catch(function (ex) {
        console.log('error on post to prescriptionFromUI');
      })
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if(name === "filled") {
      this.setState({
        [name]: false
      });
    }
    else {
      this.setState({
        [name]: value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.setState({errors:{}});
    if(this.handleValidation()){
      this.postPrescription();
      console.log("successful submit.");
    }
  }

  handleFormReset() {
    this.setState({
      firstName: '',
      lastName: '',
      prescriptionName: '',
      filled: '',
      errors: {},
      response: ''
    });
  }

  handleValidation() {
    let formIsValid = true;
    let errors = {};

    if(this.state.firstName.length < 1){
      errors["firstName"] = "Cannot be empty";
      formIsValid = false;
    }

    if(this.state.lastName.length < 1){
      errors["lastName"] = "Cannot be empty";
      formIsValid = false;
    }

    if(this.state.prescriptionName.length < 1){
      errors["prescriptionName"] = "Cannot be empty";
      formIsValid = false;
    }

    if(this.state.filled.length < 1){
      errors["filled"] = "Cannot be empty";
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  render() {
    return (
      <div>
        <header>
          <div className='container'>
            <nav className='navbar'>
              <div className='navbar-brand'>
                <span className='nav-item'><b>Enter New Prescription: (Demo of Stitch Query Anywhere/Enterprise Integrations (Slack/Twilio)</b></span>
                <br/>
                <span style={{color: "red"}}>{this.state.response}</span>
              </div>
            </nav>
          </div>
        </header>
        <br/>
        <div className="container">
          <div className="column is-9">
            <form className="form" onSubmit={this.handleSubmit} onReset={this.handleFormReset}>
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                  <span style={{color: "red"}}>{this.state.errors["firstName"]}</span>
                </div>
              </div>

              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                  <span style={{color: "red"}}>{this.state.errors["lastName"]}</span>
                </div>
              </div>

              <div className="field">
                <label className="label">Prescription Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="prescriptionName"
                    value={this.state.prescriptionName}
                    onChange={this.handleChange}
                  />
                  <span style={{color: "red"}}>{this.state.errors["prescriptionName"]}</span>
                </div>
              </div>

              <div className="field">
                <label className="label">Filled</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={this.state.filled}
                      name="filled"
                      onChange={this.handleChange}
                    >
                      <option disabled hidden value=''></option>
                      <option value="false">No</option>
                    </select>
                    <span style={{color: "red"}}>{this.state.errors["filled"]}</span>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="field">
                <div className="control">
                  <input
                    type="submit"
                    value="Submit"
                    className="button is-primary"
                  />
                  <input
                    type="reset"
                    value="Reset"
                    className="button is-primary"
                  />
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default Prescription;
