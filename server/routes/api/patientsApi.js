const { UserPasswordCredential, RemoteMongoClient } = require('mongodb-stitch-server-sdk');
const { stitchClient, credential, password } = require('../../utils/stitchAuth');

module.exports = (app) => {

  /**
   * Simple get for smoke test
   * Example:
   * curl http://0.0.0.0:8080/api/patientsApi/test
   */
  app.get('/api/patientsApi/test', (req,res,next) => {
    console.log('Test Successful.');
    res.send('Test Successful');
  });

  /**
   * Example GET call to interface with Stitch Function
   * Get patient by patient id
   * Example curl call:
   * curl http://0.0.0.0:8080/api/patientsApi/getPatientById/123
   */
  app.get('/api/patientsApi/getPatientById/:PATIENT_ID', (req,res,next) => {

    stitchClient.auth.loginWithCredential(credential)
    .then(user => {
      console.log('User logged in: ' + user.id);
    })
    .then(() => {
      console.log('Query Stitch with patient id: ' + req.params.PATIENT_ID);
      return stitchClient.callFunction('getPatientById', [req.params.PATIENT_ID])
    })
      .then( result => {
        res.json(result);
        stitchClient.close();
      })
      .catch( err => {
        console.log(err);
        stitchClient.close();
      })
  });


  /**
   * Post request to get all patients.  The user is in the
   * body of the request to facilitate what data is returned
   * via Stitch Rules.
   * Limits 20 to be returned.
   */
  app.post('/api/patientsApi/getPatients', (req,res,next) => {
    console.log("User: " + req.body.user);
    let credential = new UserPasswordCredential(req.body.user,password);
    stitchClient.auth.loginWithCredential(credential)
      .then(user => {
        console.log('User logged in: ' + user.id);
      })
      .then(() => {
        console.log("get all patients");
        let mongodb = stitchClient.getServiceClient(
          RemoteMongoClient.factory,
          "mongodb-atlas"
        );

        let patientsCollection = mongodb.db("healthdb").collection("patients");

        // TODO - add limit as a parameter
        return patientsCollection.find({},{limit:20}).asArray();
      })
      .then( result => {
        res.json(result);
        stitchClient.close();
      })
      .catch( err => {
        console.log(err);
        stitchClient.close();
      })
  });

  /**
   * Example POST request to insert(i.e. push) data to an
   * array in the patients collection.  Patient id passed
   * as parameter and data passed in body.
   */
  app.post('/api/prescriptionApi/newPrescription/:PATIENT_ID', (req,res,next) => {

    stitchClient.auth.loginWithCredential(credential)
      .then( user => {
        console.log('User logged in: ' + user.id);
      })
      .then( () => {
        let prescription = {
          prescriptionName : req.body.prescriptionName,
          prescribedDate : new Date(req.body.prescribedDate),
          expireDate : new Date(req.body.expireDate),
          filled : req.body.filled,
          filledDate : new Date(req.body.filledDate)
        };

        let query = { PATIENT_ID : req.params.PATIENT_ID };

        let mongodb = stitchClient.getServiceClient(
          RemoteMongoClient.factory,
          "mongodb-atlas"
        );

        let patientsCollection = mongodb.db("healthdb").collection("patients");

        return patientsCollection.updateOne(query, {'$push' :  {"PRESCRIPTIONS" : prescription} });

      })
      .then( result => {
        res.json(result);
        stitchClient.close();
      })
      .catch( err => {
        console.log(err);
        stitchClient.close();
      })
  });

};

