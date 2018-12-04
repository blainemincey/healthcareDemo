const {
  Stitch,
  UserPasswordCredential
} = require('mongodb-stitch-server-sdk');

/**
 * These values are based on values in a .env
 * file in the project root directory
 */
const myStitchAppId = process.env.MONGODB_STITCH_APP_ID;
const defaultUser = process.env.DEFAULT_USER;
const password = process.env.USER_ROLE_PASSWORD;

/**
 * Login to Stitch
 */
const stitchClient = Stitch.initializeDefaultAppClient(myStitchAppId);
const credential = new UserPasswordCredential(defaultUser,password);

module.exports = {
  stitchClient, credential, defaultUser, password
};
