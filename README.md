# MERN Scaffold for Healthcare Demo Application using MongoDB Stitch

This is a boilerplate project using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation
- [MongoDB Stitch](https://docs.mongodb.com/stitch/) for serverless functions in MongoDB Atlas


## Requirements

- [Node.js](https://nodejs.org/en/) 6+

```shell
npm install
```


## Running

Make sure to add a `.env` file in the project root folder. See the example there for more details.
Example file is in root folder: `.env.example`

Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```

## Example Tests (use curl and/or Postman)
1. http://0.0.0.0:8080/api/patientsApi/test 
Simple smoke test.  No DB calls, etc.  Just a simple response.

2. http://0.0.0.0:8080/api/patientsApi/getPatientById/PATIENT_ID This will interface with MongoDB Atlas to return a single document.

3. http://0.0.0.0:8080/api/prescriptionApi/newPrescription This will add a new prescription.
Must pass a JSON document in body.  Example:

`{
	"PATIENT_ID" : "c2caaace-9119-4b2d-a2c3-4040f5a9cf32",
	"prescriptionName" : "MyNewPrescription111",
	"prescribedDate" : "11/26/2018",
	"expireDate" : "11/27/2019",
	"filled" : false,
	"filledDate" : "11/27/2018"
}
`

**If you have set up Slack properly in Atlas, this will use a Stitch trigger to generate a Slack notification.

## Example Tests with browser
1. Point browser to http://0.0.0.0:8080.  Test out the link navigation.
Select 'UserRole'.  Different data is returned based on rules set in Stitch determined by user role selected using Radio Buttons.  At this time 'Other'  is not implemented.

## Notes
1. At this time of the initial version, Mongoose is not being utilized.  The scaffolding is in place to easily incorporate.
2. Not all page placeholders have been implemented.  You may get navigation errors.
