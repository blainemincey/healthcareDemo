# MERN Scaffold for Healthcare Demo Application using MongoDB Stitch

This is a boilerplate project using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation


## Requirements

- [Node.js](https://nodejs.org/en/) 6+

```shell
npm install
```


## Running

Make sure to add a `config.js` file in the `config` folder. See the example there for more details.

Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```

*** Notes ***
At this time of version 1.0 - Mongoose is not utilized
The only aspects tested are the server api to be called from 
curl and/or Postman.

Examples:
curl http://0.0.0.0:8080/api/patientsApi/test <== TO TEST

curl http://0.0.0.0:8080/api/patientsApi/getPatientById/123 <== Should log in
to Stitch/Atlas and call function
