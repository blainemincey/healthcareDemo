const { RemoteMongoClient } = require('mongodb-stitch-server-sdk');
const { stitchClient, credential } = require('../../utils/stitchAuth');

var moment = require('moment');

module.exports = (app) => {


  /**
   * POST request to add new prescription.  Prescription data
   * is passed in body.  Writes to new collection.
   *
   * In Stitch, this will fire a trigger on new insert and
   * send a message to a slack channel via webhook.
   */
  app.post('/api/prescriptionApi/newPrescription', (req, res, next) => {

    stitchClient.auth.loginWithCredential(credential)
      .then(user => {
        console.log('User logged in: ' + user.id);
      })
      .then(() => {
        let prescription = {
          PATIENT_ID: req.body.PATIENT_ID,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          prescriptionName: req.body.prescriptionName,
          prescribedDate: new Date(req.body.prescribedDate),
          expireDate: new Date(req.body.expireDate),
          filled: req.body.filled,
          filledDate: new Date(req.body.filledDate)
        };

        let mongodb = stitchClient.getServiceClient(
          RemoteMongoClient.factory,
          "mongodb-atlas"
        );

        let prescriptionsCollection = mongodb.db("healthdb").collection("prescriptions");

        return prescriptionsCollection.insertOne(prescription);

      })
      .then(result => {
        res.json(result);
        stitchClient.close();
      })
      .catch(err => {
        console.log(err);
        stitchClient.close();
      })
  });

  /**
   * POST request to add new prescription.  Prescription data
   * is passed in body.  Writes to new collection.
   *
   * In Stitch, this will fire a trigger on new insert and
   * send a message to a slack channel via webhook.
   */
  app.post('/api/prescriptionApi/newPrescriptionFromUI', (req, res, next) => {

    stitchClient.auth.loginWithCredential(credential)
      .then(user => {
        console.log('User logged in: ' + user.id);
        console.log('Execute newPrescriptionFromUI API.');
      })
      .then(() => {

        let currentTime = new Date();
        let now = new Date(moment(currentTime).format('LL'));
        let nextYear = new Date(moment(currentTime).add(1,'year').format('LL'));

        let prescription = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          prescriptionName: req.body.prescriptionName,
          prescribedDate: now,
          expireDate: nextYear,
          filled: req.body.filled
        };

        let mongodb = stitchClient.getServiceClient(
          RemoteMongoClient.factory,
          "mongodb-atlas"
        );

        let prescriptionsCollection = mongodb.db("healthdb").collection("prescriptions");

        return prescriptionsCollection.insertOne(prescription);

      })
      .then(result => {
        res.json(result);
        stitchClient.close();
      })
      .catch(err => {
        console.log(err);
        stitchClient.close();
      })
  });


};
