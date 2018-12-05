import React, { Component } from 'react';

// Placeholder for introduction
class Intro extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="Main-Div">
      <h1>Introduction</h1>
      <h2>MERN Scaffold (MongoDB/Express/React/Node)</h2>
        This is an example project related to Healthcare to demonstrate the power
        of MongoDB Atlas and MongoDB Stitch.
        <hr/>
        <h2>Web Application</h2>
        Navigate to User Role to test MongoDB Stitch Rules.
        <br/>
        Navigate to Prescription to enter new prescription.
        The filled flag is set to false by default and will send message to Slack and Twilio.
        <hr/>
        <h2>Example REST calls to use with Curl and/or Postman (Simply copy/paste for curl)</h2>
        <h4>Insert new Prescription</h4>
        <h5>With 'filled' flag set to false, Stitch Trigger sends message to Slack and Twilio</h5>
        <code>{`
          curl  --request POST --url http://0.0.0.0:8080/api/prescriptionApi/newPrescription --header 'Content-Type: application/json' --header 'cache-control: no-cache' --data '{"PATIENT_ID" : "c2caaace-9119-4b2d-a2c3-4040f5a9cf32", "firstName" : "Blaine","lastName" : "Mincey","prescriptionName" : "MyNewPrescription", "filled" : false}
        `}
        </code>
        <hr/>
        <h4>Get patient by patient id via MongoDB Stitch Webhook</h4>
        <h5>MongoDB Stitch exposes webhook to integrate directly with cluster</h5>
        <code>
        {`
          curl  --request GET --url 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/healthcareapplication-deomk/service/ProviderService/incoming_webhook/getPatientByPatientId?PATIENT_ID=c2caaace-9119-4b2d-a2c3-4040f5a9cf32&secret=mySecret&user=provider' --header 'Content-Type: application/json' --header 'cache-control: no-cache'
        `}
        </code>
        <hr/>
      </div>

    );
  }
}

export default Intro;
