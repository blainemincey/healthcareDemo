const {
  Stitch,
  RemoteMongoClient,
  UserPasswordCredential
} = require('mongodb-stitch-server-sdk')

/**
 * These are the values that must be modified
 */
const myStitchAppId = '<YOU MUST ADD THE STITCH CLIENT APP ID HERE>';
const email = '<email address>';
const password = '<password>';

/**
 * Login to Stitch
 */
const stitchClient = Stitch.initializeDefaultAppClient(myStitchAppId);
const credential = new UserPasswordCredential(email,password);


module.exports = (app) => {

  /**
   * Simple get just for simple test
   * Example:
   * curl http://0.0.0.0:8080/api/patientsApi/test
   *
   */
  app.get('/api/patientsApi/test', (req,res,next) => {
    console.log('Test Successful.');
    res.send('Test Successful');
  });

  /**
   * Example GET call to interface with Stitch Function
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

};

